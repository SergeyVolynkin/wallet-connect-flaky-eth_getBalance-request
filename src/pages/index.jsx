import { Web3Button, Web3NetworkSwitch } from "@web3modal/wagmi/react";
import CustomButton from "../components/CustomButton";
import Balance from "../components/Balance";

export default function HomePage() {
  return (
    <>
      <CustomButton />
      <Balance />
    </>
  );
}
