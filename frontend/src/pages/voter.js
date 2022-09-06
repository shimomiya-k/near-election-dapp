// 以下のように書き換えましょう
import React, { useState } from "react";
import Title from "../components/title";
import Input from "../components/input_form";
import { nft_mint, check_voter_has_been_added } from "../../near-api";

// Adding voter screen
const Voter = () => {
  // valuable of input ID for receiving vote ticket
  const [inputId, setInputId] = useState("");

  // mint function
  const mint = async () => {
    // check if user is deployer
    if (window.accountId !== process.env.CONTRACT_NAME) {
      alert("You are not contract deployer, so you can't add voter");
      return;
    }

    // check if a ticket minted to user before
    const isMinted = await check_voter_has_been_added(`${inputId}`);
    if (isMinted !== 0) {
      alert("You've already got vote ticket or voted and used it!");
      return;
    }

    // mint vote ticket to user
    await nft_mint(
      "Vote Ticket",
      "",
      "https://gateway.pinata.cloud/ipfs/QmUs5K3LwdvbhKA58bH9C6FX5Q7Bhsvvg9GRAhr9aVKLyx",
      "QmUs5K3LwdvbhKA58bH9C6FX5Q7Bhsvvg9GRAhr9aVKLyx",
      "Vote Ticket",
      "You can vote with this ticket! But remember that you can do it just once.",
      "vote",
      `${inputId}`
    );
    alert(`Vote ticket is minted to ${inputId}!`);
    setInputId("");
  };

  return (
    <div className="grid place-items-center w-full">
      <Title name="Add Voter" />
      <div className="text-lg">※Only contract deployer can add voter.</div>
      <div className="mb-24"></div>
      <Input
        title="Wallet ID"
        hint="0x..."
        input={inputId}
        type="text"
        setInput={(event) => setInputId(event.target.value)}
      />
      <div className="mb-24"></div>
      <button className="button" onClick={() => mint()}>
        Add
      </button>
    </div>
  );
};
export default Voter;
