import './contact.css'
import rice from '../../assets/rice.png'
import { useRef } from 'react';
import { useUser } from '../UserContext/usercontext';
function Contact(){
    const conRef = useRef(null);
    const titRef = useRef(null);
    const {email} = useUser();
    async function confirm() {
        const title = titRef.current?.value;
        const content = conRef.current?.value;
        if (!title || !content) {
            alert("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/email/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    to: email,
                    title: `Phản hồi từ Smart Farm`,
                    text: `Chúng tôi đã nhận được phản hồi của bạn về "${title}".\nNội dung: ${content}\nVui lòng liên hệ số điện thoại 0916150335 để được chuyên viên tư vấn kĩ thuật`
                })
            });
            if (!res.ok) {
                const errorText = await res.text();
                console.error("Lỗi khi gửi email:", errorText);
                alert("Gửi thất bại. Vui lòng thử lại.");
                return;
            }
            alert("Đã gửi phản hồi thành công!");
            titRef.current.value = '';
            conRef.current.value = '';
        } catch (err) {
            console.error("Lỗi khi gửi phản hồi:", err);
            alert("Có lỗi xảy ra khi gửi phản hồi.");
        }
    }

    return <>
                <div className='overlay2'></div>
                <div className="contactBox">
                    <div className="contactLeft">
                        <h2>Contact</h2>
                        <p className='p1'>Bạn không chắc chắn về những gì bạn cần? Đội ngũ tại Smart Farm sẽ rất vui lòng lắng nghe và hỗ trợ bạn</p>
                        <p>Email: phu.nguyenminhphu@hcmut.edu.vn</p>
                        <p>Phone: 0123456789 </p>
                    </div>
                    <div className="contactRight">
                        <h3>Chúng tôi rất mong nhận được phản hồi từ bạn!</h3>
                        <div className='contact-box'>
                            <div className="formRow">
                                <input ref={titRef} type="text" placeholder="Tiêu đề" />
                            </div>
                            <textarea ref={conRef} placeholder="Nội dung"></textarea><br/>
                            <button onClick={confirm}>Gửi</button>
                        </div>
                    </div>
                </div>
                <img className="rice" src={rice}/>
           </>
}
export default Contact;