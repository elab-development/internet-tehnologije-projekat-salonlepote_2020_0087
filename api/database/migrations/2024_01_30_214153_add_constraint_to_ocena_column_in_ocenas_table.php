<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     *///ogranicenje da kolona ocena moze da bude od 1 do 10
     public function up()
     {
         Schema::table('ocenas', function (Blueprint $table) {
             $table->integer('ocena')->default(1)->change();
         });
 
         DB::statement('ALTER TABLE ocenas ADD CONSTRAINT chk_ocena_range CHECK (ocena >= 1 AND ocena <= 10)');
     }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ocena_column_in_ocenas', function (Blueprint $table) {
            $table->integer('ocena')->change();
        });
        DB::statement('ALTER TABLE ocenas DROP CONSTRAINT chk_ocena_range');
    }
};
