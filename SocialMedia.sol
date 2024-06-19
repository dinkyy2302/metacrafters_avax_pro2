// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SocialMedia {
    struct Profile {
        string name;
        string bio;
    }

    struct Post {
        address author;
        string content;
    }

    mapping(address => Profile) public profiles;
    Post[] public posts;

    function Profile_create(string memory name, string memory bio) public {
        profiles[msg.sender] = Profile(name, bio);
    }

    function Post_create(string memory content) public {
        posts.push(Post(msg.sender, content));
    }

    function Posts_get() public view returns (Post[] memory) {
        return posts;
    }
}
