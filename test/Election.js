const Election = artifacts.require("./Election.sol");

require('chai')
	.use(require('chai-as-promised'))
	.should()

//all test inside it
/*Out of the 10 accounts that Ganache provides
deployer is first,author is the second and
tipper is the third  ganache account
*/
contract('Election-system',async ([deployer,author,voter]) => {
	let electionSystem
	let result,candidateCount

	before(async () => {
		electionSystem = await Election.deployed()

	})

	describe('deployment',async () => {
		it('deploys successfully', async () =>{
			const address = await electionSystem.address
			assert.notEqual(address,'OxO')
			assert.notEqual(address,'')
			assert.notEqual(address,null)
			assert.notEqual(address,undefined)
		})
	})

	describe('candidates',async() =>{

		before (async() => {
			//we have optional arguments
			await electionSystem.createCandidate('Candidate 1','Party 1',{from:author})
			await electionSystem.createCandidate('Candidate 2','Party 2',{from:author})
			candidateCount = await electionSystem.candidateCount()

		})

		it('create only one candidate in each party',async() =>{

			//success
			return assert.equal(candidateCount,2)

			//failure
			await electionSystem.createCandidate('','',{from : author}).should.be.rejected
		})

		it('lists candidate',async() =>{
				const candidateCreated = await electionSystem.candidates(candidateCount)
				return assert.equal(candidateCreated.id.toNumber(),candidateCount.toNumber())
		})

		it('only one vote by each candidate',async() =>{
			await electionSystem.castingVote(1,{from:author})
			await electionSystem.castingVote(2,{from:deployer})

			const voters_count = await electionSystem.voters()
			return assert.equal(voters_count,2)


		})
	})


})
