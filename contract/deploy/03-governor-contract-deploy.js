require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments;

    const dataGovernanceToken = await get("DataGovernanceToken")
    const timeLock = await get("TimeLock")

    const governorContract = await deploy("GovernorContract", {
        from: wallet.address,
        args: [dataGovernanceToken.address, timeLock.address, 5, 100, 0], 
        log: true,
    });
}

"id INTEGER PRIMARY KEY, [channelId] TEXT NOT NULL, [itemIndex] INTEGER, [title] TEXT UNIQUE, [description] TEXT NOT NULL, [contentCID] TEXT NOT NULL, [encrypted] INTEGER NOT NULL, [editedAt] INTEGER"


"('0xd50b171a593af2823af054560415f31c2f8fb06a2089b9bfa914d9b0ba4b8420',1,'First rizzdoc documentation','subscribe to see the message!','QmQA1EZ9qD28Zrdw4cownRMEvH83u9EVGbQavYbjPMCjxC',1,1696001883)"
