import React from "react";
import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import SearchBar from "../SearchBar";
import ToggleMenu from "./ToggleMenu";
import Categories from "./Categories";

const Navbar = () => {

  return (
    <div>
      <div className="py-2 border-b border-gray-200" >
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">e-buy</Link>
            <SearchBar />
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu />
              <ToggleMenu />
            </div>
          </div>
        </Container>
      </div>
      <div className="hidden md:block">
        <Categories /> {/* Only show on larger devices */}
      </div>
    </div>
  );
};

export default Navbar;
