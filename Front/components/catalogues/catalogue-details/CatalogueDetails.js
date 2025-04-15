import SidebarLayout from "@/components/layouts/sidebar-layout/SidebarLayout";
import Preview from "@/components/catalogues/preview/Preview";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import api from "@/help/api";
// import api from "../../../help/api";

const CatalogueDetails = (props) => {
  const [catalogue, setCatalogue] = useState(null);
  const router = useRouter();
  //   const { catalogue_id } = router.query;

  useEffect(() => {
    const getCatalogueData = async () => {
      try {
        const response = await api.get(`/cataloge/show/${props?.catalogueId}`);
        const data = response.data.data;
        setCatalogue(data);
        console.log("sucessfully get data", data);
      } catch (err) {
        console.log("err", err);
      }
    };

    // if (props.catalogueId) {
    getCatalogueData();
    // }
  }, [props?.catalogueId]);

  return <Preview catalogue={catalogue} />;
  //   return <h1>{catalogue?.title ?? "-"}</h1>;
};

// CatalogueDetails.PageLayout = SidebarLayout;

export default CatalogueDetails;
