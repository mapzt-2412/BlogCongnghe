import Slide from "./Slide/Slide";
import {Row, Col} from "antd";

const Home = () => {

    return (
        <div className="main-container">
            <Row>
                <Col span={16}>
                    <Slide />
                </Col>
                <Col span={8}>col-8</Col>
            </Row>
        
        </div>
    )
}
export default Home;