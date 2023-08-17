const SimpleStorage = artifacts.require("ProductManagement.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
};