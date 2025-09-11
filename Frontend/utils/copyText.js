import toast from 'react-hot-toast';


export async function copyText(text) {

    try {
        await navigator.clipboard.writeText(text);

        toast.success(`Copied Title`, {
            duration: 1000,
            // style: {
            //     backgroundColor: "red"
            // },
        });

        return true; // success

    } catch (err) {
        console.error("Failed to copy:", err);
        return false; // failure
    }
}
