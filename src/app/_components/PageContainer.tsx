import { Container, Card } from "@radix-ui/themes";
import { FC, ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
const PageContainer: FC<IProps> = ({ children }) => {
  return (
    <Container p={"8"}>
      <Card>{children}</Card>
    </Container>
  );
};

export default PageContainer;
