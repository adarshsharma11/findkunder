import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ContactPersonTable from "./ContactPersonTable";

function ContactInfoTab(props) {
  const { userId, productId } = props;
  const navigate = useNavigate();
  return (
    <div>
       <div className="flex justify-end mb-16">
        <Button
        className="whitespace-nowrap"
        variant="contained"
        color="primary"
        size="small"
        onClick={() => {
          if (productId !== 'new') {
            navigate(`/contact-person/new/${productId}`)
          } else {
            navigate('/contact-person/new')
          }
        }}
        startIcon={
            <FuseSvgIcon size={20}>
            heroicons-solid:external-link
            </FuseSvgIcon>
        }
        >
            Add Contact Person
        </Button>
       </div>
      <ContactPersonTable userId={userId} productId={productId} {...props} />
    </div>
  );
}

export default ContactInfoTab;
