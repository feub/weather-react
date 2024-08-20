export function CitySearchItem({ searchResult, previewCity }) {
    return <li className="pb-2 cursor-pointer" onClick={() => previewCity(searchResult)}>{searchResult.place_name}</li>
}