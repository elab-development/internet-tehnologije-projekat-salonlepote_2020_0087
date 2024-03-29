<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ocenas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('korisnik_id');
            $table->unsignedBigInteger('usluga_id');
            $table->integer('ocena');  
            $table->text('komentar')->nullable();
            $table->timestamps();

            $table->foreign('korisnik_id')->references('id')->on('users');
            $table->foreign('usluga_id')->references('id')->on('uslugas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ocenas');
    }
};
