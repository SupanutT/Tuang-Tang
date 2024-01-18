import Link from "next/link";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AddBill(){
    return (
        <div className="fixed bottom-10 right-10 h-auto">
            <Link href={`/MyBill/UploadImg`}>
                <AddCircleIcon color="disabled" sx={{ fontSize: 50 }}/>
            </Link>
        </div>
    );
}
