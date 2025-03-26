import React from "react";
import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import SearchBar from "../SearchBar";

const Navbar = () => {

  return (
    <div>
      <div className="p-2" >
        <Container>
          <div className="flex items-center justify-between gap-6 md:gap-0">
            <Link href="/">e-buy</Link>
            <SearchBar />
            <div className="flex items-center gap-8 md:gap-14">
              <CartCount />
              <UserMenu />
              {/* <ToggleMenu/> */}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
