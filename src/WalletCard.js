import React, { useState } from "react";
import { ethers } from "ethers";
import "./walletCard.css";

function WalletCard() {
  const [title, setTitle] = useState(
    "Connection to Metamask using window.ethereum methods"
  );
  const [errorMsg, setErrorMsg] = useState(null);
  const [connectButton, setConnect] = useState("Connect Wallet");
  const [defaultAccount, setdefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);

  const disconnectHandler = () => {
    setConnect("Connect Wallet");
    setTitle("Connection to Metamask using window.ethereum methods");
    setUserBalance(null);
    setdefaultAccount(null);
  };

  const connectHandler = () => {
    if (window.ethereum) {
      setConnect("Connected");
      setTitle("Connected to wallet using window.ethereum methods");
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangeHandler(result[0]);
        });
    } else {
      setErrorMsg("Install Metamask");
    }
  };

  const accountChangeHandler = (newAccount) => {
    setdefaultAccount(newAccount);
    getBalance(newAccount);
  };

  const getBalance = (address) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      });
  };

  window.ethereum.on("accountsChanged", accountChangeHandler);

  return (
    <div className="walletCard">
      <h4>{title}</h4>
      <button onClick={connectHandler}>{connectButton}</button>
      <button onClick={disconnectHandler}>Disconnect</button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMsg}
    </div>
  );
}

export default WalletCard;
