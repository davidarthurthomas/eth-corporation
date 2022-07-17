export const ABI = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"string","name":"description","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"round_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"backer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"left_to_raise","type":"uint256"},{"indexed":false,"internalType":"bool","name":"is_complete","type":"bool"}],"name":"NewInvestment","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"round_id","type":"uint256"},{"indexed":false,"internalType":"address","name":"voter","type":"address"},{"indexed":false,"internalType":"bool","name":"is_for","type":"bool"},{"indexed":false,"internalType":"uint256","name":"votes_for","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"votes_against","type":"uint256"},{"indexed":false,"internalType":"bool","name":"is_approved","type":"bool"}],"name":"NewVote","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"round_id","type":"uint256"},{"indexed":false,"internalType":"bool","name":"is_complete","type":"bool"}],"name":"RoundClosed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"round_id","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"description","type":"string"},{"indexed":false,"internalType":"uint256","name":"valuation","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"start_date","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"end_date","type":"uint256"}],"name":"RoundCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"founder","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"treasury_balance","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[{"internalType":"address","name":"founder","type":"address"}],"name":"addFounder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"valuation","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint32","name":"start_date","type":"uint32"},{"internalType":"uint32","name":"end_date","type":"uint32"}],"name":"createRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentRound","outputs":[{"components":[{"internalType":"uint256","name":"round_id","type":"uint256"},{"components":[{"internalType":"bool","name":"is_active","type":"bool"},{"internalType":"bool","name":"is_approved","type":"bool"},{"internalType":"bool","name":"is_complete","type":"bool"}],"internalType":"struct DAO.RoundStatus","name":"status","type":"tuple"},{"components":[{"internalType":"uint32","name":"start_date","type":"uint32"},{"internalType":"uint32","name":"end_date","type":"uint32"}],"internalType":"struct DAO.RoundTimeline","name":"timeline","type":"tuple"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"valuation","type":"uint256"},{"internalType":"uint256","name":"round_size","type":"uint256"},{"internalType":"uint256","name":"left_to_raise","type":"uint256"},{"internalType":"uint256","name":"votes_for","type":"uint256"},{"internalType":"uint256","name":"votes_against","type":"uint256"}],"internalType":"struct DAO.ReturnRound","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"founders","outputs":[{"internalType":"address payable[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"founder","type":"address"}],"name":"removeFounder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"vote","type":"bool"}],"name":"voteOnRound","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]