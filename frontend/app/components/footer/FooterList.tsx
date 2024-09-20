
interface FooterListProps {
    children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({children}) => {
    return ( 
        <div className=" w-full sm:w-1/2 md:w-1/2 mb-6 flex-col gap-2 flex lg:w-1/6">
        {children}
        </div>
     );
}
 
export default FooterList;