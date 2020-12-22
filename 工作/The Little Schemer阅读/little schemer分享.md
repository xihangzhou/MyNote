# Little Schemer阅读分享

## 1. 书籍内容概览

| 章节  |                           主要内容                           |
| :---: | :----------------------------------------------------------: |
| 1-7章 | 用书中定义的Scheme语言介绍了常见的数据结构，递归的思想，较为基础 |
|  8章  |                     介绍了高阶函数的思想                     |
|  9章  |                介绍了停机问题，Y组合子的证明                 |
| 10章  |               实现一个极简版的Scheme语言解释器               |

由于前面的内容比较基础，所以主要从第九章的内容开始我的分享，重点将落在**Y组合子**的证明，以及我自己对于函数式编程的理解

## 2. 第九章内容分享

### 2.1 停机问题

> 停机问题：是否存在一个函数，可以帮助我们判断任意一个其他函数会不会进入死循环。



* 问题解释

如下：是否存在形如willStop的函数，可以用来检验其他任意函数是否会结束循环

```js
function eternity(x){//一个无限递归，不会停下来的函数
    return eternity(x)
}

function limit(x){//一个会停下来的函数
    return x
}

function willStop(fn){//形如willStop的函数来判断函数是否会死循环
    ...
}

willStop(eterity)// =>返回false
willStop(limit)// =>返回true
```



* 问题分析

如果我们能找到一个函数，证明这个函数无法被willStop函数判断，则可以说该willStop函数不存在。

定义一个函数如下：

```js
function test(x){
	return willStop(test) && eternity(x)//eternity函数定义如上
}
```

假设willStop存在 =>

（假设willStop(test)为false => willStop(test) && eternity(x)为false => test函数不会无限循环 => 与假设矛盾）

（假设willStop(test)为true => willStop(test) && eternity(x)结果取决于eternity(x)的运行结果 => test函数无限循环 => 与假设矛盾）

=> 与willStop存在的假设矛盾=> willStop不存在

### 2.2 函数式编程以及Y组合子

#### 2.2.1 函数式编程初体验

1. 函数式编程是什么

"函数式编程"是一种["编程范式"](http://en.wikipedia.org/wiki/Programming_paradigm)，是一种书写代码的指导思想。这种指导思想要求尽可能的抽象代码的功能为函数。在纯粹的函数式编程中只有函数以及函数的参数，没有变量。

2. 一个函数式编程的例子


```js
//牛顿法实现求平方根
function sqrt(x){
    let guess = 1;
    while(Math.abs(guess * guess - x) > 0.001){
        guess = (guess + x / guess) / 2;
    }
    return guess;
}

//1. 自己实现一个abs
function abs(x) {
  return x < 0 ? -x : x;
}

//2. 自己实现一个improve
function improve(guess, x) {
  return (guess + x / guess) / 2;
}

//3. 实现比较方式
function notGood(guess, x) {
  return abs(guess * guess - x) > 0.001;
}

//4.实现循环
function iter(guess, x) {
  if (notGood(guess, x)) {
    return iter(improve(guess, x), x);
  } else {
    return guess;
  }
}

//用函数式编程的思想进行改写
function sqrtFP(x) {
  return iter(1, x);
}
```
改写的过程中，我们在尽量的

- 抽象函数：比如abs,notGood,improve等
- 减少变量：比如guess变量
- 用递归：比如用递归实现的循环便利，这也是为了实现减少变量的需求

最后我们可以看到改动的函数：

- 更易读简洁，结构清晰
- 没有变量，只有参数

2. 函数式编程的好处？

* 由于要求我们可能的抽象代码功能为函数，所以代码量小，代码的复用程度高
* 抽象函数的过程也为代码进行了命名所以结构清晰，代码易读
* 函数式编程尽可能减少变量，一个函数调用严格对应一个结果，使得模块结构清晰，函数独立性高。

3. 函数式编程的劣势？

* 极端的函数式编程中全部用递归实现遍历，所以对内存的要求高
* 极端的函数式编程中没有变量，这意味着一些简单的运算变得比较复杂

#### 2.2.2 高阶函数的抽象，匿名函数以及函数的立即执行

* 高阶函数：以函数为参数的函数

```js
function add(x, y, f) {
    return f(x) + f(y);
}

function sqr(x){
    return x * x
}

add(1,2,sqr)
```

* 函数的柯里化：一个函数返回另外一个函数

``` js
function add(x, y, f) {
    return f(x) + f(y);
}

function sqr(x){
    return x * x
}

function defineAdd(f) {
  return function (x, y) {
    return add(x, y, f);
  };
}

let sqrAdd = defineAdd(sqr)
sqrAdd(1,2)
```

* 匿名函数：()=>{}

```js
(x,y,f)=>{
    return f(x) + f(y)
}

(x)=>{
    return x * x
}
```

* 函数的立即执行

```js
// 简单的匿名函数立即执行
((x)=>{
    return x * x
})(2)

function defineAdd(f) {
  return function (x, y) {
    return add(x, y, f);
  };
}

// 函数在改写为匿名函数时注意是不是匿名执行函数
(f) => {
    return (x, y) => {
      return ((x, y, f) => {
        return f(x) + f(y);
      })(x, y, f);
    };
  }

//执行defineAdd
  ((f) => {
    return (x, y) => {
      return ((x, y, f) => {
        return f(x) + f(y);
      })(x, y, f);
    };
  })((x) => {
    return x * x;
  })

//执行sqrAdd
  ((f) => {
    return (x, y) => {
      return ((x, y, f) => {
        return f(x) + f(y);
      })(x, y, f);
    };
  })((x) => {
    return x * x;
  })(1, 2)
```



#### 2.2.3 Y组合子

在极端正统的函数式编程中，函数式编程没有变量，甚至函数也没有变量名（函数名）。然而我们在刚刚也看到了函数式编程中需要大量的使用递归，而递归就需要用函数名进行递归调用，那么怎么在一个匿名函数（没有变量名的函数中）递归调用自己呢？这就是Y组合子解决的问题，即让一个匿名函数递归使用。



* 什么是Y组合子?

```js
//1.首先定义一个函数递归求接一个数组中每项的和
function eterity(x){//一个无限递归，不会停下来的函数
    return eterity(x)
}
function rest(l) {//返回一个数组除了第一项的剩余部分
  return l.splice(1);
}
function isEmpty(l) {//判断一个数组是否为空
  return l.length === 0;
}
function first(l) {//返回一个数组的首项
  return l[0];
}
function sum(l){//返回一个数组的各项和
    if(isEmpty(l)) return 0
    else first(l) + sum(rest(l))
}

//2.这就是Y组合子
(le) => {
  return ((mkSum) => {
    return mkSum(mkSum);
  })((mkSum) => {
    return le((x) => {
      return mkSum(mkSum)(x);
    });
  });
};

//3. Y组合子的使用
  ((le) => {//这个以le为参数的匿名函数就是Y组合子
    return ((mkSum) => {
      return mkSum(mkSum);
    })((mkSum) => {
      return le((x) => {
        return mkSum(mkSum)(x);
      });
    });
  })((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })

(sum) => {
    return 
  }
 
  (sum)=>{
  (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
}

function sum(l){//返回一个数组的各项和
    if(isEmpty(l)) return 0
    else first(l) + sum(rest(l))
}
```



* Y组合子的得到证明过程：

```js
//2. 用匿名函数表示sum函数
//2.1 js中使用箭头函数实现匿名函数，写出可以返回长度为0的数组的和
  ((l) => {
    if (isEmpty(l)) return 0;
    else return first(l) + eternity(rest(l)); //此处用eternity函数暂时占位递归
  })([])

//2.2 求一个长度为1的数组的和
  ((l) => {
    if (isEmpty(l)) {
      return 0;
    } else {
      return (
        first(l) +
        ((l) => {
          if (isEmpty(l)) return 0;
          else return first(l) + eternity(rest(l));
        })(rest(l))
      );
    }
  })([2])
  
//2.3 求一个长度为2的数组的和
  ((l) => {
    if (isEmpty(l)) {
      return 0;
    } else {
      return (
        first(l) +
        ((l) => {
          if (isEmpty(l)) return 0;
          else
            return (
              first(l) +
              ((l) => {
                if (isEmpty(l)) return 0;
                else return first(l) + eternity(rest(l));
              })(rest(l))
            );
        })(rest(l))
      );
    }
  })([2, 3])

//3. 把eternity这个要重复的函数抽象一次
//3.1 求一个长度为0的数组的和
  ((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })(eternity)([])
//3.2 求一个长度为1的数组的和
  ((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })(
    ((sum) => {
      return (l) => {
        if (isEmpty(l)) {
          return 0;
        } else {
          return first(l) + sum(rest(l));
        }
      };
    })(eternity)
  )([1])
//3.2 求一个长度为2的数组的和
  ((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })(
    ((sum) => {
      return (l) => {
        if (isEmpty(l)) {
          return 0;
        } else {
          return first(l) + sum(rest(l));
        }
      };
    })(
      ((sum) => {
        return (l) => {
          if (isEmpty(l)) {
            return 0;
          } else {
            return first(l) + sum(rest(l));
          }
        };
      })(eternity)
    )
  )([1, 2])


//4. 抽象出(sum)=>{}
//4.1 对于空数组
  ((mkSum) => {
    return mkSum(eternity);
  })((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })([])
//4.2 对于长度为1的数组
  ((mkSum) => {
    return mkSum(mkSum(eternity));
  })((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })([1])
//4.3 对于长度为2的数组
  ((mkSum) => {
    return mkSum(mkSum(mkSum(eternity)));
  })((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })([1, 2])


//5. 得到sum函数
//5.1 将eternity替换为mkSum,sum改写为mkSum,得到求长度为0的数组的和的函数
  ((mkSum) => {
    return mkSum(mkSum);
  })((mkSum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + mkSum(rest(l));
      }
    };
  })([])

//5.2 对长度为1的数组，可以直接在mkSum的基础上传入eternity得到
  ((mkSum) => {
    return mkSum(mkSum);
  })((mkSum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + mkSum(eternity)(rest(l));
      }
    };
  })([1])
//5.3 可以直接传入eternity得到无限的递归
  ((mkSum) => {
    return mkSum(mkSum);
  })((mkSum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + mkSum(mkSum)(rest(l));
      }
    };
  })([1, 2, 3, 4])

//6.提取sum函数
//6.1 mkSum(mkSum)可以用一个函数包起来然后再用一个立即执行函数包到外面
  ((mkSum) => {
    return mkSum(mkSum);
  })((mkSum) => {
    return ((sum) => {
      return (l) => {
        if (isEmpty(l)) {
          return 0;
        } else {
          return first(l) + sum(rest(l));
        }
      };
    })((x) => {
      return mkSum(mkSum)(x);
    });
  })([1, 2, 3, 4])

//6.2 抽出(sum)=>{}
  ((le) => {//这个以le为参数的匿名函数就是Y组合子
    return ((mkSum) => {
      return mkSum(mkSum);
    })((mkSum) => {
      return le((x) => {
        return mkSum(mkSum)(x);
      });
    });
  })((sum) => {
    return (l) => {
      if (isEmpty(l)) {
        return 0;
      } else {
        return first(l) + sum(rest(l));
      }
    };
  })([1, 2, 3])

//6.3 Y组合子
(le) => {
  return ((mkSum) => {
    return mkSum(mkSum);
  })((mkSum) => {
    return le((x) => {
      return mkSum(mkSum)(x);
    });
  });
};
```

## 3. 第十章内容分享

本章概要：

```
本章基于前面几章节的基础，
引入了table这个数据结构，

然后用Scheme实现了一个简化版本的Scheme解释器（自身实现自身，亦叫自举）。
```

------

Tip

王垠前辈也写过一篇：怎样写一个解释器（没有原文地址，搜索即可）。

讲的内容差不多，也是比较好理解，如果对英文没耐心的，可以参考他的文章。



### entry

entry是这样一种数据结构：

```
它是一个点对，里面包含两个长度相同的子列表。

第一个子列表中的所有S表达式各不相同（即为一个集合）。
```



#### new-entry

生成一个entry数据结构

```
//build在第7章节定义过，用来生成点对
(define new-entry build)
```



#### lookup-in-entry

根据name在entry中查找对应的值。

entry-f用来处理在entry中不存在name的情况。

```
(define lookup-in-entry
  (lambda (name entry entry-f)
    (lookup-in-entry-help name
                          (first entry)
                          (second entry)
                          entry-f)))

(define lookup-in-entry-help
  (lambda (name names values entry-f))
    (cond
     ((null? names) (entry-f name))
     ((eq? (car names) name)
      (car values))
     (else (lookup-in-entry-help name
                                 (cdr names)
                                 (cdr values)
                                 entry-f))))
```



### table

也叫环境(environment)。它是这样一种数据结构：

```
它是一个列表，里面所有的S表达式都为entry。
```



#### extend-table

扩展一个table

```
(define extend-table cons)
```



#### lookup-in-table

根据name在table中查找其对应的值。

```
(define lookup-in-table
  (lambda (name table table-f)
    (cond
      ((null? table) (table-f name))
      (else (lookup-in-table name
                             (car table)
                             (lambda (name)
                               (lookup-in-table name
                                                (cdr table)
                                                table-f)))))))
```



### 简化版Scheme解释器

作者通过一系列的对话，总结了Scheme中几种基本语义类型。

- const
- quote
- identfier
- lambda
- cond
- application

既然Scheme作为一门函数式编程语言，自然就用函数(function)来表示上面这些语义类型了。

Tip

如果有兴趣的同学可以在网上搜索一下其它语言的Scheme解释器实现（比如：Python）， 有的是用类来实现的。

当然用什么来表示这些类型不是重点，重点是要了解解释器的原理。

那写解释器的第一步：

```
我们需要知道某个S表达式属于上面归纳的那种语义类型，

并且找到该类型对应的处理函数。
```



#### expression-to-action

实现S表达式属于哪种语义类型，并返回其对应的处理函数。

从第一章节我们就开始了Scheme中S表达式有两种：

1. atom
2. list

```
(define expression-to-action
  (lambda (e)
    (cond
     ((atom? e) (atom-to-action e))
     (else (list-to-action e)))))
```



#### atom-to-action

实现atom类型的S表达式属于哪种语义类型，并返回其对应的处理函数。

```
(define atom-to-action
  (lambda (e)
    (cond
     ((number? e) *const
     ((eq? e #t) *const)
     ((eq? e #f) *const)
     ((eq? e (quote cons)) *const)
     ((eq? e (quote car)) *const)
     ((eq? e (quote cdr)) *const)
     ((eq? e (quote null?)) *const)
     ((eq? e (quote eq?)) *const)
     ((eq? e (quote atom?)) *const)
     ((eq? e (quote zero?)) *const)
     ((eq? e (quote add1)) *const)
     ((eq? e (quote sub1)) *const)
     ((eq? e (quote number?)) *const)
     (else *identfier)))))
```



#### list-to-action

实现atom类型的S表达式属于哪种语义类型，并返回其对应的处理函数。

```
(define list-to-action
  (lambda (e)
    (cond
     ((atom? (car e))
      (cond
       ((eq? (car e) (quote quote)) *quote)
       ((eq? (car e) (quote lambda)) *lambda)
       ((eq? (car e) (quote cond)) *cond)
       (else *application)))
     (else *application))))
```



#### value

虽然上面两个函数里面有一堆的help函数未实现，但是咱们先假定它们实现，先把最外层的框架写好，再实现底层细节。

有了expression-to-action，那么解释器的雏形就有了。

```
; (quote ()) 表示一个空的table
(define value
  (lambda (e)
    (meaning e (quote ()))))

(define meaning
  (lambda (e table)
    ((expression-to-action e) e table)))
```

e好理解，就是需要解释的S表达式么，table是做什么的？

table是用来存储与S表达式对应的上下文环境。

比如：S表达式 (+ n 1) ，当我们计算 (+ n 1) 怎样知道n的值？

```
答案就在table里。

解释器会在给n赋值的时候就将其对应关系保存到了table中，
当调用 `(+ n 1)` 时，解释器就会从table中获取n对应的数值，然后再进行计算。
```



#### const

```
(define *const
  (lambda (e table)
    (cond
     ((number? e) e)
     ((eq? e #t) #t)
     ((eq? e #f) #f)
     (else (build (quote primitive) e)))))
```



#### quote

```
(define *quote
  (lambda (e table)
    (text-of e)))

(define text-of second)
```



#### identfier

这里就是我上面关于table的说明了。

(+ n 1) 中的n会被当作 identfier 来处理，就会调用下面的 *identfier 处理函数。

*identfier 则从table中找出与n对应的值。

```
(define *identfier
  (lambda (e table)
    (lookup-in-table e table initial-table)))

(define initial-table
  (lambda (name)
    (car (quote ()))))
```



#### lambda

原语函数和非原语函数有什么区别？

原语函数是指Scheme语言本身提供的一些基本函数。 其实就是一些我们在写Scheme解释器时预先定义好的函数。

非原语函数是用户通过(lambda ...)形式来定义的函数。那我们在解析到非原语函数时，需要将它的参数和函数体保存到table中，等待之后的*identfier调用。

```
(define *lambda
  (lambda (e table)
    (build (quote non-primitive)
           (cons table (cdr e)))))
```

lambda会将table、参数、函数体绑定在一个列表中。

那么为了方便我们之后取出对应的数据，我再定义一些help函数。

```
(define table-of first)
(define formals-of second)
(define body-of third)
```



#### cond

```
(define *cond
  (lambda (e table)
    (evcon (cond-lines-of e) table)))

(define cond-lines-of cdr)
```

evcon实现了cond函数的功能。

```
(define evcon
  (lambda (lines table)
    (cond
     ((else? (question-of (car lines)))
      (meaning (answer-of (car lines)) table))
     ((meaning (question-of (car lines)) table)
      (meaning (answer-of (car lines)) table))
     (else (evcon (cdr lines) table)))))

;; 判断某个S表达式是否为else分支
(define else?
  (lambda (x)
    (cond
     ((atom? x) (eq? x (quote else)))
     (else #f))))

(define question-of first)
(define answer-of second)
```

Note

evcon没有判断lines是否为空。

可能作者是为了实现的简洁，暂时忽略这种异常情况。

所以在使用本章节实现的Scheme解释器时，cond函数中最好至少代入一个判断分支语句。



#### application

application表示的是这样一种S表达式：

```
它为一个列表，列表的第一个元素(car)表示一个函数，
剩余的元素(cdr)表示该函数的调用参数。
(define *application
  (lambda (e table)
    (apply
      (meaning (function-of e) table)
      (evlis (arguments-of e) table))))

(define function-of car)
(define arguments-of cdr)
; 获取调用参数中每参数所对应的值。
(define evlis
  (lambda (args table)
    (cond
     ((null? args) (quote ()))
     (else (cons (meaning (car args) table)
                 (evlis (cdr args) table))))))
```



#### apply

执行函数调用。

上面讲过函数分为两种：

1. 原语函数
2. 非原语函数（自定义函数）

```
(define apply
  (lambda (func vals)
    (cond
     ((primitive? fun)
      (apply-primitive (second fun) vals))
     ((non-primitive? fun)
      (apply-closure (second fun) vals)))))
(define primitive?
  (lambda (l)
    (eq? (first l) (quote primitive))))

(define non-primitive?
  (lambda (l)
    (eq? (first l) (quote non-primitive))))
(define apply-primitive
  (lambda (name vals)
    (cond
     ((eq? name (quote cons))
      (cons (first vals) (second vals)))
     ((eq? name (quote car))
      (car (first vals)))
     ((eq? name (quote cdr))
      (cdr (first vals)))
     ((eq? name (quote null?))
      (null? (first vals)))
     ((eq? name (quote eq?))
      (eq? (first vals)))
     ((eq? name (quote atom?))
      (:atom? (first vals)))
     ((eq? name (quote zero?))
      (zero? (first vals)))
     ((eq? name (quote add1))
      (add1 (first vals)))
     ((eq? name (quote sub1))
      (sub1 (first vals)))
     ((eq? name (quote number?))
      (number? (first vals))))))

(define :atom?
  (lambda (x)
    (cond
     ((atom? x) #t)
     ((null? x) #f)
     ((eq? (car x) (quote primitive)) #t)
     ((eq? (car x) (quote non-primitive)) #t)
     (else #f))))
;; 将调用参数及非原语函数的参数组成一个entry（组成对应关系）
;; 然后添加到table中，再对该非原语函数的函数体求值即可。
(define apply-closure
  (lambda (closure vals)
    (meaning (body-of closure)
             (extend-table (new-entry (formals-of closure)
                                      vals)
                           (table-of closure)))))
```