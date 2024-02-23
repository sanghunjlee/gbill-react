import { Link } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';

export default function LogoComponent() {
    return (
        <Link to={`/gbill-react`}>
            <div className="text-3xl font-bold">
                <GroupIcon className="text-amber-500"/>
                <span className="text-amber-500 ml-2">g</span>
                <span>Bill</span>
            </div>
        </Link>
    );
}