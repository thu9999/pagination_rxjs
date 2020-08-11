import * as React from 'react';
import './App.scss';
import { Subject, combineLatest, fromEvent } from 'rxjs';
import { 
    debounceTime,
    distinctUntilChanged, 
    startWith,
    pluck,
    map,
    tap
} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

interface Item {
    id: string
    value: number
}

const PAGES: Item[] = [
    { id: uuidv4(), value: 1 },
    { id: uuidv4(), value: 2 },
    { id: uuidv4(), value: 3 },
    { id: uuidv4(), value: 4 }
];

const OPTIONS: Item[] = [
    { id: uuidv4(), value: 10 },
    { id: uuidv4(), value: 20 },
    { id: uuidv4(), value: 50 },
    { id: uuidv4(), value: 100 }
]

const App = () => {

    // Text input referencce
    const textRef = React.useRef(null);

    // Item per page select reference
    const itemsPerPageRef = React.useRef(null);

    // A subject holding current page value
    const pageSub: Subject<number> = new Subject<number>();

    React.useEffect(() => {

        // Create an observable from text input keyup event
        const text$ = fromEvent(textRef.current, 'keyup').pipe(
            pluck('target', 'value'), // Get value = target.value 
            debounceTime(500), // Emit value if user stops typing for 500ms
            distinctUntilChanged() // Emit value if previous value is different from current one
        );

        const itemsPerPage$ = fromEvent(itemsPerPageRef.current, 'change').pipe(
            pluck('target', 'value'),
            map(val => +val) // Map string to number value
        );

        const sub = combineLatest(
            text$.pipe(startWith('')), // Initial input text search value 
            itemsPerPage$.pipe(startWith(10)), // Initial items per page value 
            pageSub.asObservable().pipe(
                startWith(1), //Initial page
                distinctUntilChanged(), // Emit value if new page is different from current one
            )
        ).subscribe(console.log); // Making search or something else here

        return () => {
            sub.unsubscribe();
        }
    }, []);

    const handlePageClick = (page: number) => {
        pageSub.next(+page); // Emit new value
    }

    return (
        <div className='container'>
            <div className='row'>
                <input 
                    ref={textRef}
                    type='text' 
                    placeholder='Enter search value' 
                />
            </div>

            <div className='row'>
                <select ref={itemsPerPageRef}>
                    {OPTIONS.map(option => 
                    <option 
                        key={option.id} 
                        value={option.value}
                    >{option.value}</option>)}
                </select>
            </div>

            <div className='row'>
                <ul>
                    {PAGES.map(p => 
                    <li 
                        key={p.id} 
                        onClick={() => handlePageClick(p.value)}
                    >{p.value}</li>)}
                </ul>
            </div>
            
        </div>
    )
}

export default App;
