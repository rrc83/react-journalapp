import Swal from "sweetalert2";

export const fileUpload = async  (file)=>{
    const cloudinary = 'https://api.cloudinary.com/v1_1/dsdsxyoq1/upload';
    const fd = new FormData();
    fd.append('upload_preset','react-journal');
    fd.append('file',file);

    try{
        const rsp = await fetch(cloudinary,{
            method: 'POST',
            body:fd
        });

        if(rsp.ok){
            const cloudRsp = await rsp.json();
            return cloudRsp.secure_url;
        }else{
            throw await rsp.json();    
        }
    }catch(e){
        Swal.fire('Error upload',e.message,'error');
    }

}