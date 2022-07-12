// SPDX-License-Identifier: MIT

pragma solidity ^0.8.15;

import "@openzeppelin/contracts/utils/Context.sol";
import "./Token.sol";

contract DAO is Context {
    mapping(address => bool) private _founders;
    string private _name;
    string private _description;
    Token private _token;
    uint256 private _current_round;
    uint256 private _treasury_balance;

    /**
    * @dev Sets the values for {name} and {symbol} for the DAO and its token.
    * @param name the name of the DAO
    * @param symbol the symbol of the DAO's token
    */
    constructor(string memory name, string memory symbol, string memory description) {
        _founders[_msgSender()] = true;
        _name = name;
        _description = description;
        _token = new Token(name, symbol);
        _current_round = 0;
        _treasury_balance = 0;
    }

    // STRUCTS ---------------------------------------------------------------------------------------------------------

    struct Round {
        uint256 round_id;
        RoundStatus status;
        RoundTimeline timeline;
        string  name;
        string  description;
        uint256 valuation;
        uint256 round_size;
        uint256 left_to_raise;
        RoundVotes votes;
        RoundInvestments investments;
    }

    mapping(uint256 => Round) rounds_by_id;

    struct RoundTimeline {
        uint32  start_date;
        uint32  end_date;
    }

    struct RoundStatus {
        bool is_active;
        bool is_approved;
        bool is_complete;
    }

    struct RoundVotes {
        uint256 votes_for;
        uint256 votes_against;
        mapping(address => int256) vote_status;
    }

    struct RoundInvestments {
        address payable[] investors;
        mapping(address => uint256) investments;
    }

    // EVENTS ---------------------------------------------------------------------------------------------------------

    /**
    * @dev Event to be emitted when a round is created.
    */
    event RoundCreated(
        uint256 round_id,
        string name,
        string description,
        uint256 valuation,
        uint256 amount,
        uint256 start_date,
        uint256 end_date
    );

    /**
    * @dev Event to be emitted when a new vote is vast on a round.
    */
    event NewVote(
        uint256 round_id,
        address voter,
        bool is_for,
        uint256 votes_for,
        uint256 votes_against,
        bool is_approved
    );

    /**
    * @dev Event to be emitted when a new investment is made.
    */
    event NewInvestment(
        uint256 round_id,
        address backer,
        uint256 amount,
        uint256 left_to_raise,
        bool is_complete
    );

    /**
    * @dev Event to be emitted when a round is closed.
    */
    event RoundClosed(
        uint256 round_id,
        bool is_complete
    );

    /**
    * @dev Event to be emitted when someone withdraws their investment in a round.
    */
    event Withdrawal(
        address founder,
        uint256 amount,
        uint256 treasury_balance
    );


    // MODIFIERS -----------------------------------------------------------------------------------------------------

    /**
    * @dev Checks if the message sender is a founder of the DAO.
    */
    modifier onlyFounder() {
        require(_founders[_msgSender()], "Only founders can call this function.");
        _;
    }

    /**
    * @dev Checks that an address is listed as founder of the DAO.
    */
    modifier isFounder(address founder) {
        require(_founders[founder], "Founder doesn't exist.");
        _;
    }

    /**
    * @dev Checks that an address isn't aready listed as a founder of the DAO.
    * @param founder the address to check
    */
    modifier isNotFounder(address founder) {
        require(!_founders[founder], "Founder already exists.");
        _;
    }

    modifier noActiveRounds() {
        require(!rounds_by_id[_current_round].status.is_active, "There is already an active investment round.");
        _;
    }

    /**
    * @dev Checks that a round can be voted on.
    */
    modifier isVotable() {
        require(rounds_by_id[_current_round].status.is_active, "This round is no longer active.");
        require(!rounds_by_id[_current_round].status.is_approved, "This round has already been approved.");
        _;
    }

    /**
    * @dev Checks that a round is accepting investments.
    */
    modifier isAcceptingInvestments() {
        require(rounds_by_id[_current_round].status.is_active, "This round is no longer active.");
        require(rounds_by_id[_current_round].status.is_approved, "This round has not been approved yet.");
        require(!rounds_by_id[_current_round].status.is_complete, "This round has already been completed.");
        _;
    }

    /**
    * @dev Checks that the message sender has enough funds to invest {amount} in ETH.
    */
    modifier hasEnoughFundsToInvest(uint256 amount) {
        require(msg.value >= amount, "You don't have enough funds.");
        _;
    }

    /**
    * @dev Checks that their is enough funds to withdraw {amount} from the DAO.
    */
    modifier hasEnoughFundsToWithdraw(uint256 amount) {
        require(_treasury_balance >= amount, "The DAO doesn't have enough funds to withdraw.");
        _;
    }


    // FUNCTIONS -----------------------------------------------------------------------------------------------------

    /**
    * @dev Returns the name of the DAO.
    */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
    * @dev Returns the symbol of the DAO's token.
    */
    function symbol() public view returns (string memory) {
        return _token.symbol();
    }

    /**
    * @dev Returns the description of the DAO.
    */
    function description() public view returns (string memory) {
        return _description;
    }

    /**
    * @dev Returns the name of the current round.
    */
    function currentRoundName() public view returns (string memory) {
        return rounds_by_id[_current_round].name;
    }

    /**
    * @dev Returns the description of the current round.
    */
    function currentRoundDescription() public view returns (string memory) {
        return rounds_by_id[_current_round].description;
    }

    /**
    * @dev Returns the valuation of the current round.
    */
    function currentRoundValuation() public view returns (uint256) {
        return rounds_by_id[_current_round].valuation;
    }

    /**
    * @dev Adds a new founder to the {founders} map.
    * @param founder the address of the founder to add
    */
    function addFounder(address founder) public onlyFounder() isNotFounder(founder) {
        _founders[founder] = true;
    }

    /**
    * @dev Removes a founder from the {founders} map.
    * @param founder the address of the founder to remove
    */
    function removeFounder(address founder) public onlyFounder() isFounder(founder) {
        delete _founders[founder];
    }

    /**
    * @dev Proposes a new funding round for the DAO.
    * @param name the name of the round
    * @param description the description of the round
    * @param valuation the valuation of the round
    * @param amount the amount of tokens to be raised
    * @param start_date the start time of the round
    * @param end_date the end time of the round
    */
    function createRound(string memory name, string memory description, uint256 valuation, uint256 amount, uint32 start_date, uint32 end_date) public onlyFounder() noActiveRounds() {
        // Increment the next_round counter
        _current_round++;

        // Add a new round to the rounds_by_id mapping
        Round storage round = rounds_by_id[_current_round];
        round.round_id = _current_round;
        round.status.is_active = true;
        round.name = name;
        round.description = description;
        round.valuation = valuation;
        round.round_size = amount;
        round.left_to_raise = amount;
        round.timeline.start_date = start_date;
        round.timeline.end_date = end_date;
        round.votes.votes_for = 0;
        round.votes.votes_against = 0;
        round.status.is_approved = false;
        round.investments.investors = new address payable[](0);
        round.status.is_complete = false;

        // Emit the RoundCreated event
        emit RoundCreated(_current_round, round.name, round.description, round.valuation, amount, round.timeline.start_date, round.timeline.end_date);
    }

    /**
    * @dev Allows a founder or backer to vote on a round by adding the number of tokens they hold to {votes_for} or {votes_against}.
    * @param vote the vote to cast (true for for, false for against)
    */
    function voteOnRound(bool vote) public isVotable(){
        // Find out how many votes the sender has.
        uint256 number_of_votes = _token.balanceOf(_msgSender());
        require(number_of_votes > 0, "You must have at least one token to vote.");

        // Get the round
        Round storage round = rounds_by_id[_current_round];

        // Reset the users voting status if they're voting again
        if (round.votes.vote_status[_msgSender()] > 0) {
            round.votes.votes_for -= uint256(round.votes.vote_status[_msgSender()]);
        } else if (round.votes.vote_status[_msgSender()] < 0) {
            round.votes.votes_against -= uint256(round.votes.vote_status[_msgSender()]);
        }

        // Register the users new voting status
        if (vote) {
            round.votes.votes_for = number_of_votes;
            round.votes.vote_status[_msgSender()] = int256(number_of_votes);
        } else {
            round.votes.votes_against = number_of_votes;
            round.votes.vote_status[_msgSender()] = -int256(number_of_votes);
        }

        // Update the approval status of the round
        _update_approval();


        // Emit the NewVote event
        emit NewVote(
            _current_round,
            _msgSender(),
            vote,
            round.votes.votes_for,
            round.votes.votes_against,
            round.status.is_approved
        );
    }

    /**
    * @dev Allows someone to invest in a round.
    * @param amount the amount of ETH to invest
    *
    * NOTE: {amount} is implicitly transferred to the DAO contract.
    */
    function invest(uint256 amount) public payable isAcceptingInvestments() hasEnoughFundsToInvest(amount) {
        // Get the round
        Round storage round = rounds_by_id[_current_round];

        // If the the amount is larger than the amount left to raise, return the difference
        if (amount > round.left_to_raise) {
            amount = round.left_to_raise;
            payable(address(this)).transfer(amount - round.left_to_raise);
        }

        // Update the round
        round.left_to_raise -= amount;
        round.investments.investors.push(payable(_msgSender()));
        round.investments.investments[_msgSender()] = amount;

        // Update the completion status of the round
        _update_completion();

        // Emit the NewInvestment event
        emit NewInvestment(
            _current_round,
            _msgSender(),
            amount,
            round.left_to_raise,
            round.status.is_complete
        );
    }

    /**
    * @dev Allows a founder to withdraw {amount} from the DAO's treasury.
    * @param amount the amount of ETH to withdraw
    */
    function withdraw(uint256 amount) public onlyFounder() hasEnoughFundsToWithdraw(amount){
        // Transfer the amount to the sender
        payable(address(this)).transfer(amount);

        // Update {treasury balance}
        _treasury_balance -= amount;

        // Emit the Withdrawal event
        emit Withdrawal(
            _msgSender(),
            amount,
            _treasury_balance
        );
    }


    /**
    * @dev Updates the approval status of the current round.
    */
    function _update_approval() private {
        Round storage round = rounds_by_id[_current_round];
        uint256 votes_for_decision = _token.totalSupply() / 2;
        if (round.votes.votes_for > votes_for_decision) {
            round.status.is_approved = true;
        } else if (round.votes.votes_against > votes_for_decision) {
            round.status.is_active = false;
        }
    }

    /**
    * @dev Updates the completion status of a round.
    */
    function _update_completion() private {
        Round storage round = rounds_by_id[_current_round];
        if (round.left_to_raise == 0) {
            round.status.is_complete = true;
            _complete_mint();
            _treasury_balance += round.round_size;
        } else if (round.left_to_raise > 0 && round.timeline.end_date > block.timestamp) {
            round.status.is_active = false;
            _return_funds();
        }
    }

    /**
    * @dev Mints tokens when a round is complete.
    */
    function _complete_mint() private {
        Round storage round = rounds_by_id[_current_round];
        uint256 share_price = _share_price();
        for (uint256 i = 0; i < round.investments.investors.length; i++) {
            address investor = round.investments.investors[i];
            uint256 investment = round.investments.investments[investor];
            uint256 tokens_awarded = investment / share_price;
            _token.mint(investor, tokens_awarded);
        }

        emit RoundClosed(_current_round, true);
    }

    /**
    * @dev Returns the share price of the current round.
    */
    function _share_price() private view returns (uint256) {
        Round storage round = rounds_by_id[_current_round];
        return round.valuation / _token.totalSupply();
    }

    /**
    * @dev Returns the funds raised in a failed round.
    */
    function _return_funds() private {
        Round storage round = rounds_by_id[_current_round];
        for (uint256 i = 0; i < round.investments.investors.length; i++) {
            address payable investor = round.investments.investors[i];
            uint256 investment = round.investments.investments[investor];
            investor.transfer(investment);
        }

        emit RoundClosed(_current_round, false);
    }
}

