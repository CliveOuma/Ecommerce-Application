"use client"

import { categories } from "@/utils/Categories";
import Container from "../Container";
import Category from "./Category";

const Categories = () => {


    return ( 
        <div className="bg-white">
            <Container>
                <div className="pt-2 flex border-t flex-row items-center justify-between 
                overflow-x-auto">
                    {categories.map((item) => (
                        <Category 
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        />
                    ))}

                </div>
            </Container>

        </div>
     );
}
 
export default Categories;