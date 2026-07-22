// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Market is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable usdc;
    address public immutable oracle;
    uint256 public immutable endTime;
    string public title;
    string public description;
    bool public isScalar;
    address public creator;

    bool public resolved;
    int256 public outcome;

    mapping(address => uint256) public yesBalance;
    mapping(address => uint256) public noBalance;
    uint256 public totalCollateral;

    event PositionsBought(address indexed user, uint256 amount, bool isYes);
    event Resolved(int256 outcome);
    event Redeemed(address indexed user, uint256 amount);

    constructor(
        address _usdc,
        address _oracle,
        uint256 _endTime,
        string memory _title,
        string memory _description,
        bool _isScalar,
        address _creator
    ) Ownable(_creator) {
        usdc = IERC20(_usdc);
        oracle = _oracle;
        endTime = _endTime;
        title = _title;
        description = _description;
        isScalar = _isScalar;
        creator = _creator;
    }

    function buyCompleteSet(uint256 amount) external nonReentrant {
        require(block.timestamp < endTime, "Market closed");
        require(!resolved, "Already resolved");
        require(amount > 0, "Amount must be greater than 0");

        usdc.safeTransferFrom(msg.sender, address(this), amount);
        yesBalance[msg.sender] += amount;
        noBalance[msg.sender] += amount;
        totalCollateral += amount;

        emit PositionsBought(msg.sender, amount, true);
        emit PositionsBought(msg.sender, amount, false);
    }

    function resolve(int256 _outcome) external {
        require(msg.sender == oracle || msg.sender == owner(), "Only oracle or owner");
        require(block.timestamp >= endTime, "Too early");
        require(!resolved, "Already resolved");

        resolved = true;
        outcome = _outcome;
        emit Resolved(_outcome);
    }

    function redeem() external nonReentrant {
        require(resolved, "Not resolved yet");

        uint256 payout = 0;

        if (!isScalar) {
            if (outcome == 1) {
                payout = yesBalance[msg.sender];
            } else {
                payout = noBalance[msg.sender];
            }
        } else {
            // Simple placeholder for scalar markets
            payout = yesBalance[msg.sender];
        }

        yesBalance[msg.sender] = 0;
        noBalance[msg.sender] = 0;

        if (payout > 0) {
            usdc.safeTransfer(msg.sender, payout);
            emit Redeemed(msg.sender, payout);
        }
    }

    function getBalances(address user) external view returns (uint256 yes, uint256 no) {
        return (yesBalance[user], noBalance[user]);
    }
}
