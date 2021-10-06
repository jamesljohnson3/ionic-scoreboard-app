import { Store } from "pullstate";

const MainStore = new Store({
	
	quotes: [],
	saved: []
});

export default MainStore;

export const addSavedQuote = id => {

    MainStore.update(s => { s.saved = [ ...s.saved, id ] });
}

export const removeSavedQuote = id => {

	MainStore.update(s => { s.saved = s.saved.filter(savedId => parseInt(savedId) !== parseInt(id)) });
}

export const fetchQuotes = async () => {

	const response = await fetch("https://type.fit/api/quotes");
	const data = await response.json();

	await data.filter((quote, index) => {
		
		quote.id = (Date.now() + index);
		quote.image = `https://source.unsplash.com/random/1200x400?sig=${ quote.id }`;
	});

	MainStore.update(s => { s.quotes = data });
}