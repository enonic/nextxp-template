
import BasePart from "../components/pageeditor/parts/_BasePart";
import Image from "../components/pageeditor/_Image";
import Text from "../components/pageeditor/_Text";

const componentSelector = {
    'text': {
        page: Text
    },
    'part': {
        page: BasePart
    },
    'image': {
        page: Image
    }
};

export default componentSelector;
