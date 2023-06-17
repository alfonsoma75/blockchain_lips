const LipToken = artifacts.require("LipToken");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(LipToken, "alfy", "a");
};