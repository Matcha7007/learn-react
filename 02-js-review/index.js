const data = [
	{
		id: 1,
		title: "The Lord of the Rings",
		publicationDate: "1954-07-29",
		author: "J. R. R. Tolkien",
		genres: [
			"fantasy",
			"high-fantasy",
			"adventure",
			"fiction",
			"novels",
			"literature",
		],
		hasMovieAdaption: true,
		pages: 1216,
		translations: {
			spanish: "eldorado",
			chines: "ni hau",
			french: "senorita",
		},
		reviews: {
			goodreads: {
				rating: 4.5,
				ratingsCount: 506895,
				reviewsCount: 123490,
			},
			librarything: {
				rating: 4.53,
				ratingsCount: 434003,
				reviewsCount: 4354,
			},
		},
	},
	{
		id: 2,
		title: "The Cyberiad",
		publicationDate: "1965-01-01",
		author: "Stanishlaw Lem",
		genres: [
			"science fiction",
			"humor",
			"speculative fiction",
			"short stories",
			"fantasy",
		],
		hasMovieAdaption: false,
		pages: 295,
		translations: {},
		reviews: {
			goodreads: {
				rating: 4.16,
				ratingsCount: 11663,
				reviewsCount: 612,
			},
			librarything: {
				rating: 4.13,
				ratingsCount: 2434,
				reviewsCount: 12,
			},
		},
	},
	{
		id: 3,
		title: "Duno",
		publicationDate: "1965-01-21",
		author: "Frank Herbert",
		genres: ["science fiction", "novel", "adventure"],
		hasMovieAdaption: true,
		pages: 658,
		translations: { spanish: "" },
		reviews: {
			goodreads: {
				rating: 4.25,
				ratingsCount: 1144546,
				reviewsCount: 45453,
			},
		},
	},
	{
		id: 4,
		title: "Harry Potter and the Philosopher's Stone",
		publicationDate: "1997-06-26",
		author: "J. K. Rowling",
		genres: ["fantsy", "adventure"],
		hasMovieAdaption: true,
		pages: 223,
		translations: {
			spanish: "harry de",
			korea: "oppa",
			bengali: "md",
			portuguese: "elmajora",
		},
		reviews: {
			goodreads: {
				rating: 4.47,
				ratingsCount: 8946895,
				reviewsCount: 543490,
			},
			librarything: {
				rating: 4.39,
				ratingsCount: 1234003,
				reviewsCount: 78944,
			},
		},
	},
	{
		id: 5,
		title: "A Game of Thrones",
		publicationDate: "1996-08-01",
		author: "George R. R. Martin",
		genres: ["fantsy", "high-fantasy", "novel", "fantasy fiction"],
		hasMovieAdaption: true,
		pages: 835,
		translations: {
			spanish: "harry de",
			korea: "oppa",
			polish: "sihka",
			portuguese: "elmajora",
		},
		reviews: {
			goodreads: {
				rating: 4.44,
				ratingsCount: 2946895,
				reviewsCount: 653490,
			},
			librarything: {
				rating: 4.36,
				ratingsCount: 38003,
				reviewsCount: 1644,
			},
		},
	},
];

function getBooks() {
	return data;
}

function getBook(id) {
	return data.find((d) => d.id === id);
}

// Desctructuring
const book = getBook(2);

// ini define variable satu satu
// const title = book.title;
// const author = book.author;

// ini define variable sekaligus banyak, tapi harus yang ada pada object book namanya
const { title, author, genres, pages, hasMovieAdaption, publicationDate } =
	book;

console.log(title, author, publicationDate);

// ini define satu satu dari object array string
// const primaryGenre = genres[0]
// const secondaryGenre = genres[1]

// ini define sekaligus dari object array string
// jadi value di index 0 masuk ke primaryGenre, index 1 masuk ke secondaryGenre
// const [primaryGenre, secondaryGenre] = genres;
// console.log(primaryGenre, secondaryGenre);
// hasilnya ['science fiction', 'humor']

// ini penggunaan rest operator yang ... di belakang saat define variable
// jadi rest operator ini bakal nambahin value sisanya jadi object baru
const [primaryGenre, secondaryGenre, ...otherGenre] = genres;
console.log(primaryGenre, secondaryGenre, otherGenre);
// hasilnya ['science fiction', 'humor', [ 'speculative fiction', 'short stories', 'fantasy' ]]

// ini penggunaan spread operator yang ... di depan / di belakang saat buat object baru
// jadi ini tu digunakan buat nambahin object baru dari object yang ada ditambah anggota baru di belakangnya atau depannya
// tergantung ...objectYangAda disimpen sebelh mana, nah kalo disimpen di depan
// hasil dari spread operator bukan [[object yang ada], 'anggota baru'] tapi jadi
// ['anggota object lama jejer', 'anggota baru']
// ini berguna buat update atau nambah yang baru ke dalam object
const newGenres = [...genres, "epic fantasy"];
newGenres;
// hasilnya Array(6) ['science fiction', 'humor', 'speculative fiction', 'short stories', 'fantasy', 'epic fantasy']

// contoh nambah key dan value baru ke object book  yang ada
const updatedBook = {
	// tambahin object book ke object baru
	...book,
	// tambah properti baru beserta valuenya
	moviePublicationDate: "2001-12-19",
	// mengganti value dari pages yang sudah ada pada ...book sebelumnya
	pages: 1210,
};
updatedBook;
// hasil const updatedBook = { ...book, moviePublicationDate: "2001-12-19" };
// {
//     id: 2,
//     title: 'The Cyberiad',
//     publicationDate: '1965-01-01',
//     author: 'Stanishlaw Lem',
//     genres: [
//       'science fiction', 'humor', 'speculative fiction', 'short stories', 'fantasy'
//     ],
//     hasMovieAdaption: false,
//     pages: 295,
//     translations: {},
//     reviews: { goodreads: {...}, librarything: {...} },
//     moviePublicationDate: '2001-12-19'
// }

// hasil const updatedBook = { ...book, moviePublicationDate: "2001-12-19", pages: 1210 };
// jadi ...book ini akan ditambahkan semua properti/anggotanya ke object baru
// terus moviePublicationDate: "2001-12-19" jadi properti baru yang ditambahin
// pages: 1210 ini ngeupdate value pages yang sebelumnya ditambahin dari ...book
// tapi kalo pages: 1210 ini disimpen sebelum ...book, dia malah bakal keupdate value dari anggotanya si ...book
// soalnya kan jadi pages di awal 1210 terus masuk pages dari ...book yang punya nilai juga, jadi bakal keganti sama yang baru
// {
//     id: 2,
//     title: 'The Cyberiad',
//     publicationDate: '1965-01-01',
//     author: 'Stanishlaw Lem',
//     genres: [
//       'science fiction', 'humor', 'speculative fiction', 'short stories', 'fantasy'
//     ],
//     hasMovieAdaption: false,
//     pages: 1210,
//     translations: {},
//     reviews: { goodreads: {...}, librarything: {...} },
//     moviePublicationDate: '2001-12-19'
// }

// template literals
// pake back tick `` biar di dalemnya bisa nambah js expression di dalem ${} kaya gini ${js expression}
const summary = `${title} a book`;
summary; // 'The Cyberiad a book'

// ternary operator
// ternary operator punya 3 bagian:
// 1. kondisi, 2. result jika memenusi kondisi, 3. result jika tidak memenuhi kondisi
// ini tu if else tapi dijadiin simple
const pagesRange =
	pages > 1000 ? "more than a thousand" : "less than a thousand";

pagesRange; // 'less than a thousand'
// ternary operator bisa juga dipake di dalam template literal
console.log(
	`The book has ${hasMovieAdaption ? "" : "not"} been adapted as movie.`
); // 'The book has not been adapted as movie.'

// arrow function
// asalnya gini harus return
// function getYear(str) {
// 	return str.split("-")[0];
// }
// jadi gini jadi => tandanya ngereturn
const getYear = (str) => str.split("-")[0];

console.log(getYear(publicationDate));

// short-circuiting & logical operators: &&, ||, ??
// falsy: 0, '', null, undifined

// 1. Operator logical and/&& ini membandingkan kedua value harus sama sama bernilai true/tidak falsy
// 	console.log("Halo" && "Some string"); operan 1 yaitu "Halo" bernilai true/tidak falsy
// karena menggunakan operator logical && maka jika operand 1 true akan dicek value
// pada operand 2	dan dikembalikan nilai hasil perbandingannya
console.log("Halo" && "Some string"); // 'Some string' ​​​​​at ​​​​​​​​'Halo' && 'Some string'
// console.log(0 && "Some string"); operand 1 yaitu 0 bernilai falsy,
// maka operand 2 tidak dicek lagi tetapi langsung dikembalikan hasil perbandingannya
console.log(0 && "Some string"); // 0 ​​​​​at ​​​​​​​​0 && 'Some string'

// 2. Operator logical or/|| ini membandingkan salah satu operand harus bernilai true/tidak falsy
console.log(true || "Some string"); // true ​​​​​at ​​​​​​​​true || 'Some string'
console.log(false || "Some string"); // 'Some string' ​​​​​at ​​​​​​​​false || 'Some string'​​
// selain untuk operator perbandingan, || juga bisa digunakan untuk mendefine value secara default jika operand 1 bernilai falsy
const indonesiaTranslation = book.translations.indonesia || "NOT TRANSLATED";
indonesiaTranslation; // 'NOT TRANSLATED' ​​​​​at ​​​​​​​​indonesiaTranslation
// nah bisa juga jadi salah saat mendefine value menggunakan ||
// misal variable reviewsCount dengan tipe data number, var reviewsCount = 0
// contoh
book.reviews.librarything.reviewsCount = 0;
const wrongCount = book.reviews.librarything.reviewsCount || "NO DATA";
// ini akan mendefine value wrongCount menjadi 'NO DATA' karena 0 dianggap falsy sehingga akan mengambil value di operand 2
wrongCount; // 'NO DATA' ​​​​​at ​​​​​​​​wrongCount

// untuk mengatasi ini js membuat operator baru yaitu nulish coalescing operator dengan tanda ??
// ini seperti operator or tetapi operator akan mengembalikan value pada operand 2 jika operand 1 bernilai null atau undefined
// contoh
const rightCount = book.reviews.librarything.reviewsCount ?? "NO DATA";
// karena book.reviews.librarything.reviewsCount bernilai 0 bukan null atau undefined
// maka nulish coalescing akan mengembalikan nilai operand 1, berbeda jika
// book.reviews.librarything.reviewsCount bernilai null atau undefined,
// maka nulish coalescing akan mengembalikan nilai operand 2
rightCount; // 0 ​​​​​at ​​​​​​​​rightCount
