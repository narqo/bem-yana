BEM-YANA
========

Yet Another Node Application (*yana*) done BEM.

## Usage

See `examples` sub-projects for example usage.

## Running Examples

### "Silly"

To run example project ("silly" project in this case), follow steps described below.

First clone `bem-yana` project and install it's dependencies:

    › git clone git://<..>/bem-yana.git
    › cd bem-yana
    › npm install -d

Next you should build `examples/silly` project's  with `bem make`:

    › ./node_modules/.bin/bem make -r examples/silly

Here we are, lets run our project:

    › node examples/silly/run
    Server started on port 3014

## License

Licensed under the [MIT License](http://creativecommons.org/licenses/MIT/)<br/>
Copyright 2013 Vladimir Varankin &lt;varankinv@yandex-team.ru&gt;

## BEM

BEM is abbreviation for Block-Element-Modifier. It's a way to write code which is easy to support and develop.<br/>
For more info about BEM methodology see [bem.info](http://bem.info/).
