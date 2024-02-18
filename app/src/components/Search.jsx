export default function Search({data, setData}) {
    const onChangeInput = (e) =>{
        const value = e.target.value.toUpperCase();
        const filteredData = data.filter(val => {
            const code = val.courseID.toUpperCase();
            return code.includes(value);
        })
        setData(filteredData);
    }
    return(
        <>
        <input type="search" className="search p-2 fs-6 w-100 mb-2" onChange={onChangeInput} name="search" id="search" placeholder="search by course id" style={{outline:"none"}}/>
        </>
    );
}