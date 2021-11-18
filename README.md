# Billboard Music
### Get music list from billboard

![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXQKIW_TrAzdioxgnBNcUNhlMhDQrGx9vCBg&usqp=CAU)

npm env
```sh
npm i billboard-music
```

yarn env
```sh
yarn i billboard-music
```

## Props

| Props | value | details |
| ------ | ------ | -------- |
| top | 100 / 200 / global / artist | chart options |
| date | 2008-02-02 | get chart by date |

## How to use
 - import the library 
```
    billboards (data => {
        console.log (data)
    }, 
        {
           top: '200', // global - 200 - 100 - artist
           date: '2020-02-22' // date example: 2008-08-04 if not specifid will be todays date
        }
    )
```

this isn't any related with billboard