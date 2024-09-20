import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import AddProduct from "./AddProduct";

const AddProducts = () => {
  return (
      <Container>
        <FormWrap>
            <AddProduct />
        </FormWrap>
      </Container>
  );
};

export default AddProducts;
