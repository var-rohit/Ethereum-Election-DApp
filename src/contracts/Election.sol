pragma solidity >=0.5.0 <0.6.0;



contract Election
{
	uint public candidateCount = 0;

	struct Candidate
	{
		uint id;
		string name;
		string party;         //party to which the candidate belongs
		uint votes;

	}

	event existingParty(
		string party
	);

	event voteAlreadyCasted(
		address voter
	);

	event createdCandidate(
			uint id,
			string name,
			string party,         //party to which the candidate belongs
			uint votes
	);

	mapping (uint => Candidate) public candidates;

	function createCandidate(string memory _name,string memory _party) public
	{
		if(candidateCount == 0)
		{
			++candidateCount;
			candidates[candidateCount] = Candidate(candidateCount,_name,_party,0);
		}
		else
		{
			uint flag = 0;
			for(uint i=1;i<=candidateCount;i++)
			{
				if(keccak256(abi.encodePacked((candidates[i].party))) == keccak256(abi.encodePacked((_party))) )
				{
					flag = 1;
				}
			}

			if(flag == 0)
			{
				++candidateCount;
				candidates[candidateCount] = Candidate(candidateCount,_name,_party,0);

			}
			else
			{
				emit existingParty(_party);
			}
	    }
	}


	mapping(uint => address ) voteCasted;
	uint public voters = 0;

	function castingVote(uint _candidateId) public
	{
		require(_candidateId > 0 && _candidateId <= candidateCount);

		if(voters == 0)
		{
			voters++;
			candidates[_candidateId].votes++;
			voteCasted[voters] = msg.sender;

		}
		else
		{
			uint flag = 0;

			for(uint i=1;i<=voters;i++)
			{
				if(keccak256(abi.encodePacked((voteCasted[i]))) == keccak256(abi.encodePacked((msg.sender))))
				{
					flag = 1;
				}
			}

			if(flag == 0)
			{
				voters++;
				candidates[_candidateId].votes++;
				voteCasted[voters] = msg.sender;

			}
			else
			{
				emit voteAlreadyCasted(msg.sender);
			}
		}


	}




}
