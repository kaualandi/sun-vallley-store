import logo from './logo.png';
import './Styles/HeaderContents.css';

function HeaderContents({title}) {
    return (
        <div className="header-contents">
            <h1 className='wrapper'>{title}</h1>
        </div>
    );
}
export default HeaderContents;