BEM-YANA
========

Yet Another Node Application (*yana*) done BEM.

_Please note, this project is still under DEVELOPMENT state_

## Usage

See `examples/silly` project for example usage.

### Running Examples

To run example project, follow steps described below.

First clone `bem-yana` project and install it's dependencies:

    › git clone git://<..>/bem-yana.git
    › cd bem-yana
    › npm install -d

Next you should build `examples/silly` project's  with `bem make`:

    › ./node_modules/.bin/bem make -r examples/silly

Now lets run our project:

    › node examples/silly/run
    Server started on port 3001

## BEM

BEM is abbreviation for Block-Element-Modifier. It's a way to write code which is easy to support and develop.
For more info about BEM metodology see [bem.info](http://bem.info/).

## License

Licensed under the [MIT License](http://creativecommons.org/licenses/MIT/)
Copyright 2013 Vladimir Varankin &lt;varankinv@yandex-team.ru&gt;
