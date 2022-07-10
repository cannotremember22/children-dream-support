import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import "/global.css"
import "bootstrap/dist/css/bootstrap.min.css";
const BN = require("bn.js")


import getConfig from "./config";
const { networkId } = getConfig("development");

export default function App() {
  const [userHasNFT, setuserHasNFT] = useState(false);
  const [amount, setAmount] = useState(1);


  useEffect(() => {
    const receivedNFT = async () => {
      if (window.accountId !== "") {
        setuserHasNFT(
          await window.contract.nft_token({
            token_id: `${window.accountId}-dreamsNFT`
          })
        );
      }
    };
    receivedNFT();
  }, []);
  const mintNFT = async () => {
  let amountCurrent = amount + '000000000000000000000000'
    await window.contract.nft_mint(
        {
            token_id: `${window.accountId}-dreamsNFT`,
            metadata: {
                title: "Dream Childs",
                description: "Dream Childs",
                media:
                    "https://bafkreib2sgs4atgymoc7fedmj6e5xdpsfffzxnx7t54jsqqnplbocdqw6i.ipfs.nftstorage.link/",
            },
            receiver_id: window.accountId,
        },
        300000000000000, 
        new BN(amountCurrent)
    );
  };
  return (
    <div className="page pb-5">
       <button className="btn btn-inout"
                onClick={window.walletConnection.isSignedIn() ? logout : login}
            >
                {window.walletConnection.isSignedIn()
                    ? "Logout"
                    : "Login"}
            </button>
        <div className="header-page d-flex justify-content-end align-items-center">
          <img className="banner-top w-100" src="https://scontent.fhan3-5.fna.fbcdn.net/v/t1.15752-9/291632541_456747416454359_2048986501625265818_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=IN38NEHo8kwAX8lE9eF&_nc_ht=scontent.fhan3-5.fna&oh=03_AVJxS2whGpUC8igq5hdxEdHkQTatyS_Ok80ztldXSr1NyQ&oe=62F094D6" />
        </div>
        
        <div className="body-page">
            <div className="container d-flex py-5">
              <img className="nft" src="https://bafkreib2sgs4atgymoc7fedmj6e5xdpsfffzxnx7t54jsqqnplbocdqw6i.ipfs.nftstorage.link/" />
            <div className="content-nft ms-2 text-white">
                <p className="mt-3" style={{fontWeight: 'bold'}}>CHILDREN'S DREAM NFT</p>
                <p className="mt-2"> 
                  Each <b>Mint</b> turn you will contribute minimum <b>1 Near</b> to the chidren's dream fund
                  <br />

                </p>
                {userHasNFT && window.accountId !== "" ? '':
                  <div>
                    <input className="w-100 mt-3" type="number" min="1" value={amount} onChange={e => setAmount(Number(e.target.value) < 1 ? 1 : Number(e.target.value))} />
                    <button className="btn btn-info mt-3" disabled={!window.walletConnection.isSignedIn()} onClick={mintNFT}>Mint to donate</button>
                  </div>
                  }
                  {userHasNFT? 
                <div>
                  <p style={{fontSize:'15px'}} className="text-success">You have successfully done your donation. Thank you so much <b>{window.accountId}</b>!</p>
                </div>
                : ''}
            </div>
            </div>
        </div>
        <div className="container">
          <p className="title-page text-center">SHARE THEIR DREAMS</p>
          <p className="text-center">No two dreams are alike. Every day we're inspired by the imaginations</p>
          <p className="text-center">and personalities of the children we're honored to serve.</p>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-4 d-flex justify-content-center">
              <div className="img-posts">
                <img className="nft" src="https://nationaltoday.com/wp-content/uploads/2022/06/7-Children-Day-640x514.jpg" />
              </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <div className="img-posts">
                <img src="https://images.medicinenet.com/images/mobile/hp_promo/children-screen-time.jpg" />
              </div>
            </div>
            <div className="col-4 d-flex justify-content-center">
              <div className="img-posts">
                <img src="https://media-exp1.licdn.com/dms/image/C4E1BAQEVXzSA0sHL4w/company-background_10000/0/1519801591269?e=2147483647&v=beta&t=o_ZxW59owtwIqeRjcjIT2Aczd1VH0aZJI5auUSIHYxc" />
              </div>
            </div>
          </div>
          <div>

          </div>
        </div>
    </div>
);
}