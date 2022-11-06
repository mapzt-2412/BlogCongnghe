import React, {memo, useState} from 'react';
import Image from 'next/image';
import IconBack from "../../assets/icon/IconBack"

const data = [
    {
        image: "/aboutPage1.png",
        content: "Hiện nay, các trang blog về công nghệ bằng tiếng Anh xuất hiện khá nhiều trên không gian mạng, nhưng đối với các đối tượng độc giả không giỏi ngoại ngữ thì đây hiển nhiên là một trở ngại rất lớn. Vì lẽ đó, các trang blog công nghệ bằng tiếng Việt được viết bởi những người có kinh nghiệm trong ngành, cũng nổi lên nhiều hơn nhằm mục"
    },
    {
        image: "/aboutPage2.png",
        content: "Nhưng hiện tại đa số các trang blog công nghệ Việt chỉ hoạt động theo tương tác một chiều, ít trang có thể cho độc giả trao đổi hay thậm chí là tương tác như một mạng xã hội. Chính vì lẽ đó, đã thôi thúc chúng tôi thực hiện đề tài “Xây dựng hệ thống hỗ trợ người dùng viết blog về công nghệ”."
    },
    {
        image: "/aboutPage3.png",
        content: "Blog công nghệ là nơi chủ yếu cung cấp thông tin đề cập tới những chủ đề chọn lọc, liên quan đến công nghệ, dành cho đối tượng người đọc yêu thích công nghệ. Chính do blog được lập nên bởi cá nhân hoặc một nhóm người, nên đòi hỏi cá nhân hay nhóm người đó phải cập nhật xu hướng liên tục, phải nắm được các tag xu hướng hiện nay để có thể cung cấp cho người đọc cái nhìn đa chiều về thế giới công nghệ, nhưng thực tế số blog đáp ứng được điều này và còn tồn tại thì rất ít."
    },
    {
        image: "/aboutPage4.png",
        content: "Đề tài “Xây dựng hệ thống hỗ trợ người dùng viết blog về công nghệ” ra đời, cho các blogger và độc giả có thêm sự lựa chọn, nhằm giải quyết các vấn đề mà các blog hiện nay còn thiếu: + Blog được viết bởi bất kỳ ai đăng ký thành viên, giúp giải quyết vấn đề các nội dung luôn đảm bảo được cập nhật liên tục, và có góc nhìn đa chiều đối với cùng một chủ đề. + Vì hoạt động như một mạng xã hội, nên vấn đề xu hướng hay các bình luận nổi bật về các tag xu hướng hiện nay cũng sẽ được giải quyết."
    },
]
const AboutPage1 = ({page, setPage}) => {

    return (
        <div className={`about-container page${page}`}>
                    <div className="about-left">
                        <div className="about-button-pre" onClick={()=> setPage(page-1)}>
                            <IconBack width={40} page={page}/>
                        </div>
                        <Image src={data[page-1].image} layout="responsive" width={589} height={338} alt='about'/>
                    </div>
                    <div className="about-right">
                        <p>
                        {
                            data[page-1].content
                        }
                        </p>
                        {
                            page !== 4 ? 
                            (
                                <div className="about-next-button" onClick={() => setPage(page + 1)}>
                                    <p>Tiếp tục</p>
                                </div>      
                            ):(
                                <div className="about-next-button" onClick={() => setPage(0)}>
                                    <p>Trở về trang giới thiệu</p>
                                </div>
                            )
                        }
                    </div>
                    
                </div>
    )
}
export default memo(AboutPage1);