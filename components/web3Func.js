import { toast } from "react-toastify";

/* I have made this function so I can use metamask function according to 
my own convenience anywhere I can, so I dont have to write code in each page */

const getAccounts = async () => {
  if (window.ethereum) {
    let accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch(() => {
        toast.warning("Check the metamask icon!");
        return;
      });

    if (await window.ethereum._metamask.isUnlocked()) {
      return accounts[0];
    } else {
      return;
    }
  } else {
    toast.warning("Please Install Metamask");
  }
};

export default getAccounts;
