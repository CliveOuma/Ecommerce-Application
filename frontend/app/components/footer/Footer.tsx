import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import {MdFacebook} from 'react-icons/md'
import {AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from 'react-icons/ai'

const Footer = () => {
    return <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
        <Container>
            <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                <FooterList>
                    <h3 className="text-base font-bold mt-2">Shop Categories</h3>
                    <Link href="#">Phones</Link>
                    <Link href="#">Laptops</Link>
                    <Link href="#">Watches</Link>
                </FooterList>
                <FooterList>
                    <h3 className="text-base font-bold mt-2">Customer Service</h3>
                    <Link href="#"></Link>
                    <Link href="#">Contact Us</Link>
                    <Link href="#">Shipping Policy</Link>
                    <Link href="#">Returns and Exchanges</Link>
                </FooterList>
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <h3 className="text-base font-bold mt-2">About Us</h3>
                    <p className="mb-2">At e-buy, we are passionate about delivering high-quality products
                        and exceptional service to our customers. To provide a
                        convenient and enjoyable shopping experience for everyone.
                        we have quickly grown into a trusted online destination.
                        We take pride in offering a curated selection from top brands
                        and independent designers.</p>
                    <p>copyright  ©   {new Date().getFullYear()} e-buy. All Rights reserved</p>
                </div>
                <FooterList>
                <h3 className="text-base font-bold mt-2">Follow Us</h3>
                <div className="flex gap-2">
                <Link href="#">
                    <MdFacebook size={24}/>
                </Link>
                <Link href="#">
                    <AiFillTwitterCircle size={24}/>
                </Link>
                <Link href="#">
                    <AiFillInstagram size={24}/>
                </Link>
                <Link href="#">
                    <AiFillYoutube size={24}/>
                </Link>
                </div>
                </FooterList>
            </div>
        </Container>
    </footer>;

};

export default Footer;
