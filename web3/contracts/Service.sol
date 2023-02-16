// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Service {
    constructor() {}

    ///// Voting Function //////

    struct Poll {
        string topic;
        string description;
        uint256 yesCount;
        uint256 noCount;
        uint256 totalCount;
        uint256 createdAt;
    }

    // Track last poll created by owner
    mapping(address => uint256) private lastPollCreation;

    // To search for a specfic poll
    mapping(uint256 => Poll) public polls;

    // Total vote count for a poll
    uint256 public pollCount;

    event PollCreated(uint256 pollId, string topic, string description);
    event Voted(uint256 pollId, bool choice);

    /**
    Create poll and limit creator to one poll per day
    */
    function createPoll(
        string memory _topic,
        string memory _description,
        uint256 _createdAt
    ) public {
        require(
            lastPollCreation[msg.sender] + 1 days < block.timestamp,
            "You can only create one poll per day"
        );
        pollCount++;
        polls[pollCount] = Poll(_topic, _description, 0, 0, 0, _createdAt);
        emit PollCreated(pollCount, _topic, _description);
    }

    /**
    Get single poll details to display
     */
    function getPollDetails(uint256 _pollId)
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        require(_pollId > 0 && _pollId <= pollCount, "Invalid poll ID");
        Poll memory poll = polls[_pollId];
        return (
            poll.topic,
            poll.description,
            poll.yesCount,
            poll.noCount,
            poll.totalCount,
            poll.createdAt
        );
    }

    /**
    Allow any community member to vote
     */
    function vote(uint256 _pollId, bool _choice) public {
        require(_pollId > 0 && _pollId <= pollCount, "Invalid poll ID");
        if (_choice) {
            polls[_pollId].yesCount++;
        } else {
            polls[_pollId].noCount++;
        }
        emit Voted(_pollId, _choice);
    }

    /**
    Get all the polls
     */
    function getPolls() public view returns (uint256[] memory) {
        uint256[] memory pollIds = new uint256[](pollCount);
        for (uint256 i = 1; i <= pollCount; i++) {
            pollIds[i - 1] = i;
        }
        return pollIds;
    }

    ///// Booking Function //////

    struct Booking {
        uint256 startTime;
        string facilityName;
        address user;
    }

    event Booked(uint256 startTime, string facilityName);

    // List of all the bookings
    Booking[] public facilityBookings;
    //
    mapping(address => Booking[]) public userBookings;

    function bookFacility(uint256 _startTime, string memory _facilityName)
        public
    {
        require(
            !isFacilityBooked(_startTime, _facilityName),
            "Facility is already booked"
        );

        Booking memory newBooking = Booking({
            startTime: _startTime,
            facilityName: _facilityName,
            user: msg.sender
        });

        facilityBookings.push(newBooking);
        userBookings[msg.sender].push(newBooking);

        emit Booked(_startTime, _facilityName);
    }

    function isFacilityBooked(uint256 _startTime, string memory _facilityName)
        public
        view
        returns (bool)
    {
        for (uint256 i = 0; i < facilityBookings.length; i++) {
            Booking memory booking = facilityBookings[i];
            if (
                keccak256(bytes(booking.facilityName)) ==
                keccak256(bytes(_facilityName)) &&
                booking.startTime == _startTime
            ) {
                return true;
            }
        }
        return false;
    }

    function getUserBookings() public view returns (Booking[] memory) {
        return userBookings[msg.sender];
    }
}
