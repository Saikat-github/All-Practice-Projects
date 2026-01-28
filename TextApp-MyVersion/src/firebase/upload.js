import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";


// Initialize Firebase Storage
const storage = getStorage();

const upload = async (file) => {
    const storageRef = ref(storage, `images/${Date.now() + file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);


    return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })

};




const deleteFileByUrl = async (fileUrl) => {
    try {
        // Extract the file path from the URL (after "/o/" and before "?alt=")
        const decodedPath = decodeURIComponent(fileUrl.split("/o/")[1].split("?alt=")[0]);

        // Create a reference to the file
        const fileRef = ref(storage, decodedPath);

        // Delete the file
        await deleteObject(fileRef);
        console.log("File deleted successfully!");
    } catch (error) {
        console.error("Error deleting file:", error);
    }
};



export { upload, deleteFileByUrl };

