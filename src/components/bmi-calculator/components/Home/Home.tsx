import { Helmet } from "react-helmet-async";
import { Modal } from "./Modal/Modal";
import { BmiSection } from "./BmiSection/BmiSection";
import { UserDataSection } from "./UserDataSection/UserDataSection";
import { ExtraInfoSection } from "./ExtraInfoSection/ExtraInfoSection";
import { HomeMain } from "./HomeStyles";
import { CaloricNeeds } from "./CaloricNeedSection/cloric-needs";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Healthy | Home</title>
        <link rel="icon" href="/assets/logo.svg" />
      </Helmet>

      <HomeMain>
        <Modal />
         <UserDataSection />
        <BmiSection />
        <ExtraInfoSection />
        <CaloricNeeds/>
      </HomeMain>
    </>
  );
}
