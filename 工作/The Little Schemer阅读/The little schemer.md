# The Little Schemer阅读笔记

## 1. Toys

第一章就是理解一些定义的语法：

1. atom

* atom是不以(或者)开头的字符串
* 用空格间隔两个atom



2. list

* 理解为数组，成员可以是别的数组或是atom
* ()为空数组



3. S-expression

* a一个tom或者是一个list也是一个S-expression,可以理解为符合表达规则的表达式



4. car

* car of  l 或者 (car l) 返回一个list，即l，的第一个元素
* 返回值是一个S-expression
* 不能返回空list的car
* 不能返回atom的car



5. cdr

* cdr of l 或者(cur l)返回一个**非空**list，即l，的除了第一个元素的剩余元素
* 返回值是一个list

* 不能返回atom的cdr



6. Cons

* (cons a l) 表示把a加到list l 的首部，a可以是atom或者list
* 即a可以是任何S-expression



7. null

* (null? l) 返回一个l即list是否是空list



8. (atom? s)

* 返回s是否是一个atom



9. Eq

* （eq ? a b）意思为a和b是否相等
* 返回值为bool
* a和b都必须是不为数字的atom

## 2. Do it again and again(递归的概念)

1. lat

* 由atom组成的list,可以为空
* (lat? l) 意思为l是否为lat

2. （or (表达式1)(表达式2)）

or 表示或关系，两个表达式的或关系是or的返回值

3. (member? a l)

a这个S expression是不是l的其中一个孩子

4. 如何定义member

![image-20201130142638079](The little schemer.assets/image-20201130142638079.png)

此处 define为定义

lambda为参数

(cond

​	(条件1)(返回值1) 

​	(条件2)(返回值2) )

(else(返回值3)))

(Null ? lat) #f 意为若lat为null则返回false

然后就是一个else + 递归

## 3. cons the magnificent（递归的应用）

1. rember a l

把a这个东西从l中删除，若l中没有a,则什么也不做

2. 定义rember

![image-20201130145252082](The little schemer.assets/image-20201130145252082.png)

![image-20201130145355225](The little schemer.assets/image-20201130145355225.png)

3. 定义(firsts l)

返回l这个list中每一个list中的第一个s-expression

![image-20201130151923376](The little schemer.assets/image-20201130151923376.png)

若为null.即空list,则返回(quote()),即空list

4. (insertR new old l)

把new这个新的值插入到l这个list的第一个old的后面

![image-20201130153730746](The little schemer.assets/image-20201130153730746.png)

5. multirember(a lat)

把lat中所有的a都删掉

![image-20201130154450563](The little schemer.assets/image-20201130154450563.png)

6 . multiinsertR(new old lat)

lat中所有的old的右边都插入new

![image-20201130154649015](The little schemer.assets/image-20201130154649015.png)

## 4. Numbers Games

1. number

本书中只考虑非负整数

2. (add1 y)

返回 1 + y 

3. (sub1 y)

返回y - 1

注意sub1 0无答案因为我们只考虑非负整数

4. (+ n m)

![image-20201201164408517](The little schemer.assets/image-20201201164408517.png)

5. (- n m)

![image-20201201164626012](The little schemer.assets/image-20201201164626012.png)

6. tup

tup是a list of numbers,注意只能是number不能是list或者atoms

空list也是tup

7. (addup tup)

返回tup中的number和

![image-20201201170123997](The little schemer.assets/image-20201201170123997.png)

8. (x n m)

![image-20201201170231814](The little schemer.assets/image-20201201170231814.png)

9. (tup+ tup1 tup2)

![image-20201201170610448](The little schemer.assets/image-20201201170610448.png)

10. (> n m)

return n > m

![image-20201201171042959](The little schemer.assets/image-20201201171042959.png)

11. (< n m )

![image-20201201171109102](The little schemer.assets/image-20201201171109102.png)

12. (= n m)

![image-20201201171454272](The little schemer.assets/image-20201201171454272.png)

13. (⬆️ n m) n的m次方

![image-20201201171724374](The little schemer.assets/image-20201201171724374.png)

14. (➗ n m )

![image-20201201172003584](The little schemer.assets/image-20201201172003584.png)

15. (length l) 

![image-20201201172141600](The little schemer.assets/image-20201201172141600.png)

16. (pick n l)

![image-20201201172220654](The little schemer.assets/image-20201201172220654.png)

拿到l的第n个atoms，下标从1开始

17. （rempick n l）

返回去掉第n个atoms的l

![image-20201201172357256](The little schemer.assets/image-20201201172357256.png)

![image-20201201173504400](The little schemer.assets/image-20201201173504400.png)

18. (number? n)

返回 n 是否是 number

19. (no-nums l)

返回去除了number的l

![image-20201201172957170](The little schemer.assets/image-20201201172957170.png)

20. (all-nums l)

返回所有的number

![image-20201201173050931](The little schemer.assets/image-20201201173050931.png)

21. eqan(a1 a2)

![image-20201201173148872](The little schemer.assets/image-20201201173148872.png)

22. occur(a lat)

a 在 lat中出现的次数

![image-20201201173307998](The little schemer.assets/image-20201201173307998.png)

## 5.It's full of stars

1. rember* a l 

深度去除l中的所有a

![image-20201202152311914](The little schemer.assets/image-20201202152311914.png)

2. (insertR* new old l)

深度在所有的old atom的右边加上atom new

![image-20201202153041063](The little schemer.assets/image-20201202153041063.png)

3. (occur* a l)

深度数一下a在l中的出现次数

![image-20201202153359888](The little schemer.assets/image-20201202153359888.png)

4. (subst* new old l)

深度用new代替所有old

![image-20201202153850831](The little schemer.assets/image-20201202153850831.png)

5. (insertL* new old l)

深度在old的左边加new

![image-20201202153949544](The little schemer.assets/image-20201202153949544.png)

6. (member* a l)

深度找a是否在l中出现过

![image-20201202154403293](The little schemer.assets/image-20201202154403293.png)

7. (leftmost l)

返回l中第一个出现的atom,但是如果第一个s-expression是空list则没有答案

对空list也没有答案

![image-20201202154829049](The little schemer.assets/image-20201202154829049.png)

8. eqlist

深度对比两个list

![image-20201202160616540](The little schemer.assets/image-20201202160616540.png)

9. equal

考虑了atom,lis,number三种类型的相等

![image-20201202160915306](The little schemer.assets/image-20201202160915306.png)

10. **使用eqlist简写eqlist**

![image-20201202161636352](The little schemer.assets/image-20201202161636352.png)

这是一种我没有见过的递归类型，即两个函数相互递归调用

11. 如果rember(s l)是指s是任意s-expression, l中也是任何s-expresssion的list

![image-20201202162846991](The little schemer.assets/image-20201202162846991.png)

## 6. Shadows

1. Arithmetic expression

atom或者是arithmetic运算符比如+ ✖️ ⬆️



2. (quote a)

Quote a 把a变成字符atom



3. (numbered ? z)

判断z这个arithmetic是否只包含除了+ ✖️ ⬆️的数字,即是否是一个能算出一个返回值的合法的表达式

![image-20201204120051536](The little schemer.assets/image-20201204120051536.png)

![image-20201204120133075](The little schemer.assets/image-20201204120133075.png)

注意z是由一个list表示的

比如 1 + （2 * 3） =》 [1,+,[2,*,3]]

4. (Value nexp)

计算nexp这个表达式的值

![image-20201204141914398](The little schemer.assets/image-20201204141914398.png)

如果运算符号在前的话：即 + 1 2 = 3

![image-20201204143156196](The little schemer.assets/image-20201204143156196.png)

![image-20201204143204670](The little schemer.assets/image-20201204143204670.png)

![image-20201204143213492](The little schemer.assets/image-20201204143213492.png)

![image-20201204143222915](The little schemer.assets/image-20201204143222915.png)

注意这个地方的运算只是两个数的运算即  + 1 1 不会是 + 1 1 1

通过抽取公共函数的方式可以使得我们的代码更加简洁。比如抽取operator或者1st-sub-exp

 

5. 用()表示数字

1 (())   2 (()())

6. 检验0 aero?

![image-20201204144003617](The little schemer.assets/image-20201204144003617.png)

7. edd1 

![image-20201204144039505](The little schemer.assets/image-20201204144039505.png)

8. zub1

![image-20201204144057437](The little schemer.assets/image-20201204144057437.png)

9. 重新定义➕

![image-20201204144243946](The little schemer.assets/image-20201204144243946.png)

10. shadows

把（1 2 3）用()表示可以表示为 ((())  (()()) (()()()))

每一个list用() 每一个list中的每一项也用()以示区分 再用()的个数表示数字的大小

这个时候用lat? 方法去判断 （1 2 3）的括号表现形式就会失效，这就是shadows

![image-20201204144923782](The little schemer.assets/image-20201204144923782.png)

## 7. Friends and Relations

1. Set 

没有重复值的list

2. set?

![image-20201207100735355](The little schemer.assets/image-20201207100735355.png)

3. makeset l

把l去重

![image-20201207101344507](The little schemer.assets/image-20201207101344507.png)

![image-20201207101601267](The little schemer.assets/image-20201207101601267.png)

4. Subset set1 set2

Set1 是否是 set2 的子集

![image-20201207102221567](The little schemer.assets/image-20201207102221567.png)

5. eqset?

两个set是否相等

![image-20201207102323969](The little schemer.assets/image-20201207102323969.png)

6. intersect? set1 set2

两个set是否有交集

![image-20201207102531776](The little schemer.assets/image-20201207102531776.png)

7. intersect set1 set2

取两个set的交集

![image-20201207102844242](The little schemer.assets/image-20201207102844242.png)

8. Union set1 set2

取set1 和 set2的并集

![image-20201207103805757](The little schemer.assets/image-20201207103805757.png)

9. intersectall l-set ！！

l中的每一个item都是set,返回每一个item中都有的item

![image-20201207104754323](The little schemer.assets/image-20201207104754323.png)

10. a-pair?

判断一个list是否只由两个S-sepressions组成



11. first second third build函数

用于简化其他函数

![image-20201207142019511](The little schemer.assets/image-20201207142019511.png)![image-20201207142154866](The little schemer.assets/image-20201207142154866.png)

12. rel

a set of pairs, 即不重复的pairs构成的list

13. fun? rel

注意firsts的定义

![image-20201207143152077](The little schemer.assets/image-20201207143152077.png)

14. revrel

颠倒rel中每一个pair的顺序

![image-20201207143641004](The little schemer.assets/image-20201207143641004.png)

如果有一个revpair函数![image-20201207145031246](The little schemer.assets/image-20201207145031246.png)

可以改写revrel为

![image-20201207145053856](The little schemer.assets/image-20201207145053856.png)

15. fullfun? fun

seconds为获取fun中每一个item的第二个值

![image-20201207145355982](The little schemer.assets/image-20201207145355982.png)

16. One-to-one

![image-20201207145607943](The little schemer.assets/image-20201207145607943.png)

## 8. lambda the ultimate

1. rember-f（test? a l）

test为判断相等的函数，a为一个atom，l是一个list,删掉l中的第一个a

把function作为参数传入

![image-20201210172642130](The little schemer.assets/image-20201210172642130.png)

2. 一个函数返回另外一个函数（柯里化）

![image-20201210180417642](The little schemer.assets/image-20201210180417642.png)

3. 用柯里化去处理rember-f并命名为remember-eq?

![image-20201210182214018](The little schemer.assets/image-20201210182214018.png)

![image-20201210181444356](The little schemer.assets/image-20201210181444356.png)

4. insertL-f和insertR-f

![image-20201210183021157](The little schemer.assets/image-20201210183021157.png)

![image-20201210183030977](The little schemer.assets/image-20201210183030977.png)

5. seqL 和 seqR 和seqS 和 seqS

   seqL返回插入左边的函数，seqR返回插入右边的函数

   ![image-20201210183644613](The little schemer.assets/image-20201210183644613.png)

![image-20201210183652564](The little schemer.assets/image-20201210183652564.png)

![image-20201210185032038](The little schemer.assets/image-20201210185032038.png)

6. 写一个insert-g()函数以seqL或者是seqR为参数决定插入的位置

![image-20201210183907464](The little schemer.assets/image-20201210183907464.png)

7. 用insert-g重新定义insertL

![image-20201210183946811](The little schemer.assets/image-20201210183946811.png)

8. 用insert-g重新定义insertR

![image-20201210184010168](The little schemer.assets/image-20201210184010168.png)

9. 用insert-g重新定义sebst

![image-20201210185227247](The little schemer.assets/image-20201210185227247.png)

10. 用seqrem和insert-g定义rember

![image-20201210185721951](The little schemer.assets/image-20201210185721951.png)

yyy即是rember, 参数 #f只是为了占位



11. 改写计算一个表达式的值的value函数

![image-20201211100925276](The little schemer.assets/image-20201211100925276.png)

![image-20201211100935746](The little schemer.assets/image-20201211100935746.png)

抽象出atom-to-function对于符号的判断功能

12. Multirember-f

![image-20201211104136612](The little schemer.assets/image-20201211104136612.png)

13. multiremberT

![image-20201211104303115](The little schemer.assets/image-20201211104303115.png)

这个方法中的test?是像以下的比较函数中的一样进行的与一个值的比较

![image-20201211104833830](The little schemer.assets/image-20201211104833830.png)

14. ！！！ multirember&co ！！！

![image-20201211105124616](The little schemer.assets/image-20201211105124616.png)

这个函数有些复杂，每一次运行都会传出当前域的值形成闭包进行递归，并且每一次递归都会传传一个函数参数。

这个函数的作用是，遍历lat这个数组，与a相等的值放在参数seen中，与b相等的值放在参数newlat中，最后返回以seen和newlat为参数的col函数的值



15. multiinsertLR

![image-20201211145820214](The little schemer.assets/image-20201211145820214.png)

等于oldL插在左边，等于oldR插在右边，相当于把multiinsertL和multiinsertR合并在了一起



16. multiinsertLR&co

![image-20201214170935247](The little schemer.assets/image-20201214170935247.png)

![image-20201214170943201](The little schemer.assets/image-20201214170943201.png)

函数目的： 执行一个col函数，这个函数的第一个参数是执行了multiinsertLR函数的返回值，第二个参数是和oldL相等的lat项的个数，第三个参数是和oldR相等的lat项的个数

注意点：

​			1: lat作为参数传入multiinsertLR函数中

​			2: 最后的递归边界是执行这个函数

​			3: 每一次新传入的col都只简单的执行了col，递归的关系体现在了传参中

​			4: newlat相当于这一步之后生成的结果，就相当于在multiinsertLR函数在每一次递归中的返回值

​			5: 这个col参与了整个multiinsertLR函数的递归过程，并且在参数的传递中实现了递归过程，就像是collector一样一直在收集multiinsertLR函数的结果，等multiinsertLR函数执行完了，collector也收集完了，就可以以收集结果为参数执行自己的方法

17. evens-only*

![image-20201214175332131](The little schemer.assets/image-20201214175332131.png)

18. evens-only* l

![image-20201214174816207](The little schemer.assets/image-20201214174816207.png)

收集器col中有三个参数，第一个是newl,是even-only的返回值，返回的是l中的所有偶数，p是所有偶数的乘积，s是所有偶数的和

所以其实收集器就是把函数的递归关系写在了参数中，参数有几个就可以有几个递归关系，即几个递归的结果

## 9. again and again

1. looking a lat

![image-20201216184727098](The little schemer.assets/image-20201216184727098.png)

从lat的第一位开始找a这个atom



2. pick num lat

从lat中取出下标为num的atom



3. Keep-looking

![image-20201216185141749](The little schemer.assets/image-20201216185141749.png)

4. Partial/total functin

partial function是有可能无限循环没有终点的函数，total是一定有输出值的函数



5. eternity

![image-20201216185408299](The little schemer.assets/image-20201216185408299.png)

这是一个可能是最简单的无限循环的函数，是一个partial的函数



6. Shift x

![image-20201216185859068](The little schemer.assets/image-20201216185859068.png)

shift ( (1,2) ,(3,4) ) =>   (1,( 2,(3,4)) )

7. Align 

![image-20201216190356086](The little schemer.assets/image-20201216190356086.png)

是total的函数，一个参数一定有一个返回值

8. Length* 

![image-20201216201448477](The little schemer.assets/image-20201216201448477.png)

返回一个pora,即pair的长度



9. Weight* pair

![image-20201217095749955](The little schemer.assets/image-20201217095749955.png)

对于align来说，length* 去衡量一个pair的长度不太好。因为决定align是否能终止循环递归的是pair的第一个元素，所以第一个元素更重要。解决方法就是使用weight，给第一个元素的长度一个更大的权重。



10. shuffle

![image-20201217100509288](The little schemer.assets/image-20201217100509288.png)

shuffle就是partial的，因为revpair只是交换pair两个元素的位置，如果一个pair的两个与安素都是不是atom，那么这个函数就没有返回值



11. 探究有没有一个函数可以判断所有的函数是不是total的

will-stop

![image-20201217102158956](The little schemer.assets/image-20201217102158956.png)



Last-try

![image-20201217102220311](The little schemer.assets/image-20201217102220311.png)

如果will-stop? Last-try的值为false,则意味假设last-try是不会停下来的，而and (will-stop? Last-try) (eternity x)

表达式如果will-stop? Last-try为假就不会去执行eternity x, 函数就会停下来，推导出矛盾



if will-stop? Last-try === true => last-try会停下来 => 执行eternity x =>  last-try停不下来 => 推导出矛盾

所以will-stop是一个不存在的函数，或者说这是一个不能被定义的函数



12. 探究如何用匿名函数实现递归

用length函数举例：

![image-20201217104330692](The little schemer.assets/image-20201217104330692.png)

length就是一个用递归实现的函数，但是如果不能不能给这个函数length的名字了，那它怎么在定义函数的时候调用自己呢？

* 初步思想：每递归一层就把函数抄一遍

  * 对空数组

  ![image-20201217104648557](The little schemer.assets/image-20201217104648557.png)

  ​		在这种情况下我们只能判断空数组的长度为0

  * 对长度为1的数组

  ![image-20201217104754166](The little schemer.assets/image-20201217104754166.png)

  ​		相当于在本来递归的那里再重新抄了一次代码

  * 对长度为2或以下的数组

  ![image-20201217105214458](The little schemer.assets/image-20201217105214458.png)

  ​			再抄了一次代码

* 进阶1: 这样写太繁琐了，我们可以提取函数的公共部分

  * 对于长度为0的数组

  ![image-20201217105943713](The little schemer.assets/image-20201217105943713.png)

  * 对于长度为1的数组

  ![image-20201217110009565](The little schemer.assets/image-20201217110009565.png)
  * 对于长度为2的数组

  ![image-20201217110049053](The little schemer.assets/image-20201217110049053.png)

  

  这一层相当于是把每一层的递归嵌套解放了出来，代码长度是差不多的但是逻辑划分更清晰

* 进阶2: 再抽象一层

  * 对于长度为0的数组

  ![image-20201217110534129](The little schemer.assets/image-20201217110534129.png)
  * 对于长度为1的数组

  ![image-20201217110730212](The little schemer.assets/image-20201217110730212.png)

  * 对于长度为2的数组

  ![image-20201217110801734](The little schemer.assets/image-20201217110801734.png)

* 进阶3: 由于eternity这个函数是什么并不重要，所以我们甚至可以传mk-lengh进去

![image-20201217152007883](The little schemer.assets/image-20201217152007883.png)

甚至length也可以被mk-length所替换，这样可以更好的提醒我们一切都是mk-length

![image-20201217152107570](The little schemer.assets/image-20201217152107570.png)

如果我们只运行一次mk-length,我们可以得到长度小于等于1的

![image-20201217155045391](The little schemer.assets/image-20201217155045391.png)

如果我们迭代运行mk-length,可以无限递归得本来的length函数

![image-20201217155303585](The little schemer.assets/image-20201217155303585.png)

* 进阶4: 但是这个样子不像length的样子，可以先把mk-length mk-length做如下的变换，及用一个函数包起来

![image-20201218165758110](The little schemer.assets/image-20201218165758110.png)

再把外面这个函数用一个lambda(length)包起来

![image-20201217161849135](The little schemer.assets/image-20201217161849135.png)

再把框中的部分提取出来，再包一个函数在外面，提出length

![image-20201217162042071](The little schemer.assets/image-20201217162042071.png)

外面这一层就是applicative-order Y combinator（Y算子）

![image-20201217171856131](The little schemer.assets/image-20201217171856131.png)

## 10.What is the Value of All of this

1. entry的定义

一个pair,一个元素是set,第二个元素是一个list,并且两个元素的长度相等

2. Lookup-in-enty name entry

![image-20201220163911520](The little schemer.assets/image-20201220163911520.png)

#### ![image-20201220163833017](The little schemer.assets/image-20201220163833017.png)

这个函数用一个lookup-in-entry-help来实现了它的helper函数。

这个函数的本来目的是返回entry的第二个元素中的一个元素，这个元素的位置是name在第一个元素中出现的位置。

如果name没有出现过则用entry-f执行name

例子：

![image-20201220164207941](The little schemer.assets/image-20201220164207941.png)

2. table

a list of entries

3. Lookup-in-table (name table table-f)

![image-20201220165604835](The little schemer.assets/image-20201220165604835.png)

在一个table中找到第一个能用上lookup-in-entry的entry



4. 