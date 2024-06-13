function spliit(raw_content, content) {
  // Split the raw_content into lines
  let list = raw_content.split('\n');

  // Remove each line from the content
  list.forEach((each) => {
    content = content.replace(each, "");
  });

  // Remove "Translated" and "Original" keywords and their surrounding text
  content = content.replace(/(\(Translated\):|\(Original\):)/gi, "");

  // Remove any extra whitespace
  content = content.replace(/\s+/g, ' ').trim();

  console.log(content);  // Output the final content
}

let raw_content = `не надо ехать на Фушифару!!!!  Есть много других приличных островов!!!
не надо ехать на Фушифару!!!!  Есть много других приличных островов!!! Cons: грязно, тараканы в вилле разных размеров, полно Комаров, ни на территории не в вилле ни разу за 15 дней не проводились дезинфекционные мероприятия. очень плохая уборка виллы!!!  Пляж очень грязный: опасные куски проволоки от сетки рабицы, очень много бетонных кусков строительного мусора и прочего хлама!  всего 2 ресторана со скудным ассортиментом, очень мало фруктов, а экзотических нет вообще: бананы и яблоки мы и в Москве поедим!!!`;

let content = `(Translated): don't go to Fushifara!!!! There are lots of other decent islands out there!!! (Original): не надо ехать на Фушифару!!!!  Есть много других приличных островов!!!
(Translated): don't go to Fushifara!!!! There are lots of other decent islands out there!!! Cons: it's dirty, there are cockroaches in the villa of different sizes, it's full of Mosquitoes, neither the villa has ever been disinfected in 15 days. Very poor cleaning of the villa!!! The beach is very dirty: dangerous pieces of wire from the chain-link net, a lot of concrete pieces of construction waste and other rubbish! only 2 restaurants with a meager assortment, very few fruits, and no exotic ones at all: we will also eat bananas and apples in Moscow!!! (Original): не надо ехать на Фушифару!!!!  Есть много других приличных островов!!! Cons: грязно, тараканы в вилле разных размеров, полно Комаров, ни на территории не в вилле ни разу за 15 дней не проводились дезинфекционные мероприятия. очень плохая уборка виллы!!!  Пляж очень грязный: опасные куски проволоки от сетки рабицы, очень много бетонных кусков строительного мусора и прочего хлама!  всего 2 ресторана со скудным ассортиментом, очень мало фруктов, а экзотических нет вообще: бананы и яблоки мы и в Москве поедим!!!`;

spliit(raw_content, content);
