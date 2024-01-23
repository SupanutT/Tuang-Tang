    export default function HeadCell( { value, id }: { value: string, id: number } ){

        let width = '100px';

        switch (value) {
            case 'No':
                width = '50px';
                break;
            case 'Menu':
                width = '200px';
                break;
            default:
                width = '100px';
                break;
        }

        return (
            <th
            style={{ width }}
            className={`py-[15px] bg-[#edc077] text-white text-center`}
            key={id}
            >
                {value}
            </th>
        );
    }
