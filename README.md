BEM-YANA
========

Yet Another Node Application (*yana*) done BEM.

_Please note, that this project is in the early development state_

Usage
-----

See `examples/silly` project for example usage.

### Running Examples

To run example project, follow steps described below.

First clone `bem-yana` project and install it's dependencies:

    › git clone git://<..>/bem-yana.git
    › cd bem-yana
    › npm install -d

Next you should build `examples/silly` project's  with `bem make`:

    › bem make -r examples/silly

**NOTE**

`bem` should be in your `PATH` environment variable. You could do this by adding this line to your user's
`.profile` config:

    exports PATH=./node_modules/.bin:$PATH

Now lets run our project:

    › node examples/silly/run
    Server started on port 3001

#### How it works

**TODO**

For more usage examples, have a look at [bem-yana-stub](https://github.com/narqo/bem-yana-stub) project.

---

BEM is abbreviation for Block-Element-Modifier. It's a way to write code which is easy to support and develop.

For more info about BEM metodology see [bem.info](http://bem.info/).

