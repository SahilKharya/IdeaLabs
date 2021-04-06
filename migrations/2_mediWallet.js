const MediWallet = artifacts.require("MediWallet");

module.exports = function (deployer) {
  deployer.deploy(MediWallet);
};
