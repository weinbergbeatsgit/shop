import main from '../images/main.png'

const Header = () => {
    return (
        <div className='flex-column gap-20 width-100'>
            <div className="flex-column text-center">
                <label className="header_label1">WEINBERG BEATS</label>
                <label className="header_label2 gold">WEINLOUNGE MITTEN IM WEINBERG</label>
                <label className="header_label3 red">- 13. und 14. Mai -</label>
            </div>
        <img src={main} className="header-image"/>
        </div>
    )
}

export default Header