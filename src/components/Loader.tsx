import { Oval } from "react-loader-spinner";

const Loader = () => {
    return ( 
        <Oval
            height={30}
            width={30}
            color="#029491"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#029491"
            strokeWidth={2}
            strokeWidthSecondary={2}
        />
    );
}
 
export default Loader;