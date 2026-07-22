// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Market.sol";

contract MarketFactory is Ownable, ReentrancyGuard {
    IERC20 public immutable usdc;
    address public umaOracle;

    address[] public allMarkets;
    mapping(address => bool) public isMarket;

    event MarketCreated(
        address indexed market,
        address indexed creator,
        string title,
        uint256 endTime,
        bool isScalar
    );

    constructor(address _usdc, address _umaOracle) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        umaOracle = _umaOracle;
    }

    function createMarket(
        string calldata title,
        string calldata description,
        uint256 endTime,
        bool isScalar
    ) external nonReentrant returns (address) {
        require(endTime > block.timestamp + 1 days, "End time too soon");

        Market market = new Market(
            address(usdc),
            umaOracle,
            endTime,
            title,
            description,
            isScalar,
            msg.sender
        );

        address marketAddress = address(market);
        isMarket[marketAddress] = true;
        allMarkets.push(marketAddress);

        emit MarketCreated(marketAddress, msg.sender, title, endTime, isScalar);
        return marketAddress;
    }

    function getAllMarkets() external view returns (address[] memory) {
        return allMarkets;
    }

    function setUmaOracle(address _oracle) external onlyOwner {
        umaOracle = _oracle;
    }
}
